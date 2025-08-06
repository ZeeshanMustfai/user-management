import { User, UserFormData } from '@/types'
import { Modal, Form, Input, Select, Button } from 'antd'
import { useEffect } from 'react'
const UserFormModal: React.FC<{
  open: boolean
  onCancel: () => void
  onSave: (data: UserFormData) => Promise<void>
  user?: User
  loading: boolean
}> = ({ open, onCancel, onSave, user, loading }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (open) {
      if (user) {
        form.setFieldsValue({
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        })
      } else {
        form.setFieldsValue({
          name: '',
          email: '',
          role: 'user',
          status: 'active',
        })
      }
    }
  }, [open, user, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await onSave(values)
    } catch (error) {
      // Form validation errors are handled by Ant Design
      console.log('Form validation failed:', error)
    }
  }

  return (
    <Modal
      title={user ? 'Edit User' : 'Add User'}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='save'
          type='primary'
          loading={loading}
          onClick={handleSubmit}
        >
          {user ? 'Update' : 'Create'}
        </Button>,
      ]}
      width={500}
    >
      <Form form={form} layout='vertical' style={{ marginTop: 16 }}>
        <Form.Item
          name='name'
          label='Name'
          rules={[
            { required: true, message: 'Please enter the name' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input placeholder='Enter user name' />
        </Form.Item>

        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: 'Please enter the email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder='Enter email address' />
        </Form.Item>

        <Form.Item
          name='role'
          label='Role'
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder='Select role'>
            <Select.Option value='admin'>Admin</Select.Option>
            <Select.Option value='moderator'>Moderator</Select.Option>
            <Select.Option value='user'>User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='status'
          label='Status'
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select placeholder='Select status'>
            <Select.Option value='active'>Active</Select.Option>
            <Select.Option value='pending'>Pending</Select.Option>
            <Select.Option value='banned'>Banned</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserFormModal
