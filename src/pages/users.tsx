/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Space, notification, Switch, Card } from 'antd'
import { PlusOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])
import { User, UserFormData } from '@/types'
import { useUserStore } from '@/store'
import { useNotification } from '@/shared/lib/hooks/use-notification'
import UserFormModal from '@/features/user-form'
import { mockAPI } from '@/shared/lib/utils'
import { DeleteUserModal } from '@/features/user-delete'
import {
  ActionsRenderer,
  DateRenderer,
  RoleRenderer,
  StatusRenderer,
} from '@/shared/ui/table'

const UserManagemet: React.FC = () => {
  const {
    users,
    loading,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    setLoading,
  } = useUserStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>()
  const [formLoading, setFormLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { showSuccess } = useNotification()

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        const userData = await mockAPI.fetchUsers()
        setUsers(userData)
      } catch (error) {
        notification.error({
          message: 'Failed to load users',
          description: 'Please try refreshing the page',
        })
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [setUsers, setLoading])

  // Event handlers
  const handleEdit = useCallback((user: User) => {
    console.log('Editing User:', user)
    setEditingUser(user)
    setModalOpen(true)
  }, [])

  const handleDelete = useCallback(
    (userId: string) => {
      setDeletingUserId(userId)
      setDeleteModalVisible(true)
      // Modal.confirm({
      //   title: 'Delete User',
      //   content:
      //     'Are you sure you want to delete this user? This action cannot be undone.',
      //   okText: 'Delete',
      //   okType: 'danger',
      //   cancelText: 'Cancel',
      //   onOk: async () => {
      //     try {
      //       await mockAPI.deleteUser(userId)
      //       deleteUser(userId)
      //       notification.success({
      //         message: 'User Deleted',
      //         description: 'User has been successfully deleted',
      //         duration: 3,
      //       })
      //     } catch (error) {
      //       notification.error({
      //         message: 'Delete Failed',
      //         description: 'Failed to delete user',
      //       })
      //     }
      //   },
      // })
    },
    [deleteUser]
  )

  const handleAddUser = useCallback(() => {
    setEditingUser(undefined)
    setModalOpen(true)
  }, [])

  const handleSaveUser = useCallback(
    async (userData: UserFormData) => {
      setFormLoading(true)
      try {
        if (editingUser) {
          const updatedUser = await mockAPI.updateUser(editingUser.id, userData)

          updateUser(editingUser.id, updatedUser)
          notification.success({
            message: 'User Updated',
            description: 'User has been successfully updated',
            duration: 3,
          })
        } else {
          const newUser = await mockAPI.createUser(userData)
          addUser(newUser)
          notification.success({
            message: 'User Added',
            description: 'New user has been successfully added',
            duration: 3,
          })
        }
        setModalOpen(false)
        setEditingUser(undefined)
      } catch (error) {
        notification.error({
          message: 'Save Failed',
          description: 'Failed to save user data',
        })
      } finally {
        setFormLoading(false)
      }
    },
    [editingUser, addUser, updateUser]
  )

  const handleModalCancel = useCallback(() => {
    setModalOpen(false)
    setEditingUser(undefined)
  }, [])

  // Column definitions for AG Grid
  const columnDefs = useMemo(
    () => [
      {
        headerName: 'ID',
        field: 'id',
        width: 80,
        pinned: 'left',
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Name',
        field: 'name',
        flex: 1,
        sortable: true,
        filter: true,
        filterParams: {
          filterOptions: ['contains', 'startsWith', 'endsWith'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Email',
        field: 'email',
        flex: 1,
        sortable: true,
        filter: true,
        filterParams: {
          filterOptions: ['contains', 'startsWith', 'endsWith'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Role',
        field: 'role',
        flex: 1,
        cellRenderer: RoleRenderer,
        filter: true,
        filterParams: {
          filterOptions: ['equals'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        cellRenderer: StatusRenderer,
        filter: true,
        filterParams: {
          filterOptions: ['equals'],
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: 'Creation Date',
        field: 'creationDate',
        flex: 1,
        sortable: true,
        cellRenderer: DateRenderer,
        sort: 'desc',
      },
      {
        headerName: 'Actions',
        width: 120,
        pinned: 'right',
        cellRenderer: ActionsRenderer,
        sortable: false,
        filter: false,
        resizable: false,
      },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: false,
      filter: false,
      floatingFilter: false,
    }),
    []
  )

  const gridContext = useMemo(
    () => ({
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
    [handleEdit, handleDelete]
  )

  const handleDeleteConfirm = async () => {
    if (!deletingUserId) return

    setDeleteLoading(true)
    try {
      await mockAPI.deleteUser(deletingUserId)
      deleteUser(deletingUserId)
      notification.success({
        message: 'User Deleted',
        description: 'User has been successfully deleted',
        duration: 3,
      })
      setDeleteModalVisible(false)
    } catch (error) {
      notification.error({
        message: 'Delete Failed',
        description: 'Failed to delete user',
      })
    } finally {
      setDeleteLoading(false)
      setDeletingUserId(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false)
    setDeletingUserId(null)
  }

  const themeStyle = {
    marginBottom: '24px',
    backgroundColor: isDarkMode ? '#141414' : '',
    color: isDarkMode ? '#ffffff' : '#000000',
  }

  return (
    <div
      style={{
        padding: '24px',
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#141414' : '',
      }}
    >
      <Card style={themeStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600 }}>
            User Management System
          </h1>
          <Space size='middle'>
            <Switch
              checked={isDarkMode}
              onChange={setIsDarkMode}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={handleAddUser}
              size='large'
            >
              Add User
            </Button>
          </Space>
        </div>
      </Card>

      <Card style={themeStyle}>
        <div
          style={{ width: '100%', height: '500px' }}
          className={isDarkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
        >
          <AgGridReact
            theme='legacy'
            className={isDarkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
            rowData={users}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
            loading={loading}
            animateRows={true}
            rowSelection='single'
            suppressRowClickSelection={true}
            context={gridContext}
            rowHeight={50}
            headerHeight={50}
            domLayout='normal'
          />
        </div>
      </Card>

      {deleteModalVisible && (
        <DeleteUserModal
          visible={deleteModalVisible}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          userName=''
          loading={deleteLoading}
        />
      )}

      <UserFormModal
        open={modalOpen}
        onCancel={handleModalCancel}
        onSave={handleSaveUser}
        user={editingUser}
        loading={formLoading}
      />
    </div>
  )
}

export default UserManagemet
