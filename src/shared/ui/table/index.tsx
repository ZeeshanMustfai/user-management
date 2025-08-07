/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Button, Space, Tag, Tooltip, notification } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  CrownOutlined,
  SafetyOutlined,
} from '@ant-design/icons'
import { useUserStore } from '@/store'
import { mockAPI } from '@/shared/lib/utils'
export const StatusRenderer = ({ value }: { value: string }) => {
  const statusConfig = {
    active: { color: 'green', text: 'Active' },
    banned: { color: 'red', text: 'Banned' },
    pending: { color: 'orange', text: 'Pending' },
  }

  const config =
    statusConfig[value as keyof typeof statusConfig] || statusConfig.pending
  return <Tag color={config.color}>{config.text}</Tag>
}

export const DateRenderer = ({ value }: { value: string }) => {
  if (!value) return null

  const date = new Date(value)
  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  return (
    <Tooltip title={date.toISOString()}>
      <span>{formatted}</span>
    </Tooltip>
  )
}

export const RoleRenderer = ({ value, data }: any) => {
  const { updateUser } = useUserStore()

  const roleConfig = {
    admin: {
      icon: <CrownOutlined style={{ color: '#faad14' }} />,
      label: 'Admin',
    },
    moderator: {
      icon: <SafetyOutlined style={{ color: '#1890ff' }} />,
      label: 'Moderator',
    },
    user: {
      icon: <UserOutlined style={{ color: '#52c41a' }} />,
      label: 'User',
    },
  }

  const handleRoleChange = async (newRole: string) => {
    try {
      await mockAPI.updateUser(data.id, { role: newRole as any })
      updateUser(data.id, { role: newRole as any })
      notification.success({
        message: 'Role Updated',
        description: `User role changed to ${newRole}`,
        duration: 2,
      })
    } catch (error) {
      notification.error({
        message: 'Update Failed',
        description: 'Failed to update user role',
      })
    }
  }

  const config = roleConfig[value as keyof typeof roleConfig]

  return (
    <Space>
      {config?.icon}
      <Select
        value={value}
        size='small'
        style={{ width: 100 }}
        onChange={handleRoleChange}
      >
        <Select.Option value='admin'>Admin</Select.Option>
        <Select.Option value='moderator'>Moderator</Select.Option>
        <Select.Option value='user'>User</Select.Option>
      </Select>
    </Space>
  )
}

export const ActionsRenderer = ({ data, context }: any) => {
  return (
    <Space>
      <Button
        type='text'
        size='small'
        icon={<EditOutlined />}
        onClick={() => context.onEdit(data)}
      />
      <Button
        type='text'
        size='small'
        danger
        icon={<DeleteOutlined />}
        onClick={() => context.onDelete(data.id)}
      />
    </Space>
  )
}
