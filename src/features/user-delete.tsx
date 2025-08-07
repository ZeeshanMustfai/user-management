import React from 'react'
import { Modal, Button, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface DeleteUserModalProps {
  visible: boolean
  onCancel: () => void
  onConfirm: () => Promise<void>
  loading?: boolean
  userName?: string
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  loading = false,
  userName,
}) => {
  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
          Delete User
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key='cancel' onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key='delete'
          type='primary'
          danger
          loading={loading}
          onClick={onConfirm}
        >
          Delete
        </Button>,
      ]}
      width={400}
    >
      <p>
        Are you sure you want to delete{' '}
        {userName ? <strong>{userName}</strong> : 'this user'}?
      </p>
      <p style={{ color: '#666' }}>This action cannot be undone.</p>
    </Modal>
  )
}

// Usage in your component:
/*
const YourComponent = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { notification } = App.useApp()

  const handleDeleteClick = (userId: string) => {
    setDeletingUserId(userId)
    setDeleteModalVisible(true)
  }

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

  return (
    <>
      // Your component content
      <Button 
        danger 
        onClick={() => handleDeleteClick(user.id)}
      >
        Delete
      </Button>

      <DeleteUserModal
        visible={deleteModalVisible}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        userName={users.find(u => u.id === deletingUserId)?.name}
      />
    </>
  )
}
*/
