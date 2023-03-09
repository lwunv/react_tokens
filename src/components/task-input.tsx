import { observer } from 'mobx-react'
import { useState } from 'react'
import { useStore } from '../stores'

export const TaskInput = observer(() => {
  const store = useStore()

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    logo: ''
  })

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e:any) => {
    store.task.add(formData)
  }

  return (
    <div>
      <div
        className="
              p-3 
              bg-component 
              dark:bg-component-dark
              text-dark
              dark:text-light
              flex 
              items-center
              shadow-lg
              rounded-lg
              mt-3
          "
      >
        <input
          name="title"
          value={formData.title}
          onInput={handleInputChange}
          type="text"
          placeholder="Title"
          className="bg-transparent outline-0 flex-1 px-3"
        />
      </div>

      <div
        className="
              p-3 
              bg-component 
              dark:bg-component-dark
              text-dark
              dark:text-light
              flex 
              items-center
              shadow-lg
              rounded-lg
              mt-3
          "
      >
        <input
          name="price"
          value={formData.price}
          onInput={handleInputChange}
          type="text"
          placeholder="Price"
          className="bg-transparent outline-0 flex-1 px-3"
        />
      </div>

      <div
        className="
              p-3 
              bg-component 
              dark:bg-component-dark
              text-dark
              dark:text-light
              flex 
              items-center
              shadow-lg
              rounded-lg
              mt-3
          "
      >
        <input
          name="logo"
          value={formData.logo}
          onInput={handleInputChange}
          type="text"
          placeholder="Logo url"
          className="bg-transparent outline-0 flex-1 px-3"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 bg-primary px-5 py-3 text-base text-light rounded-lg"
      >
        Add
      </button>
    </div>
  )
})
