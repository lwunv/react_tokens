import { observer } from 'mobx-react'
import { useState } from 'react'
import { useStore } from '../stores'
import { useNavigate  } from 'react-router-dom'

export const TaskInput = observer(() => {
  const store = useStore()
  const navigate = useNavigate()

  const deformData = {
    title: '',
    price: '',
    logo: ''
  }

  const [formData, setFormData] = useState({...deformData})
  const [errors, setErrors] = useState({...deformData})

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setErrors({...errors, [name]: ''})
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e:any) => {
    let check = true
    const errors = {...deformData}
    if (!formData.title) {
      check = false
      errors.title = 'Please enter token title'
    }
    if (!formData.price) {
      check = false
      errors.price = 'Please enter token price'
    }
    setErrors(errors) 

    if (check) {
      store.task.add(formData)
      setFormData(deformData)
      navigate('/')
    }
  }

  return (
    <div className="mb-5 mt-5">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-bold mb-2"
        >
          Title
        </label>
        <input
          data-testid="input"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={
            errors.title
              ? "border-red-500 border-2 focus:outline-none focus:border-red-500 rounded-lg px-4 py-3 w-full"
              : "border-gray-300 border-2 focus:outline-none focus:border-blue-500 rounded-lg px-4 py-3 w-full"
          }
        />
        {errors.title && (
          <p className="italic text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-gray-700 font-bold mb-2"
        >
          Price
        </label>
        <input
          data-testid="input"
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className={
            errors.price
              ? "border-red-500 border-2 focus:outline-none focus:border-red-500 rounded-lg px-4 py-3 w-full"
              : "border-gray-300 border-2 focus:outline-none focus:border-blue-500 rounded-lg px-4 py-3 w-full"
          }
        />
        {errors.price && (
          <p className="italic text-red-500 mt-1">{errors.price}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="logo"
          className="block text-gray-700 font-bold mb-2"
        >
          Logo url
        </label>
        <input
          data-testid="input"
          type="text"
          id="logo"
          name="logo"
          value={formData.logo}
          onChange={handleInputChange}
          className={
            errors.logo
              ? "border-red-500 border-2 focus:outline-none focus:border-red-500 rounded-lg px-4 py-3 w-full"
              : "border-gray-300 border-2 focus:outline-none focus:border-blue-500 rounded-lg px-4 py-3 w-full"
          }
        />
        {errors.logo && (
          <p className="italic text-red-500 mt-1">{errors.logo}</p>
        )}
      </div>

      <button
        data-testid="button"
        onClick={handleSubmit}
        className="mt-5 bg-primary px-5 py-3 text-base text-light rounded-lg"
      >
        Add new token
      </button>
    </div>
  )
})
