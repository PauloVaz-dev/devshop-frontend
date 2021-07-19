import Link from 'next/link'
import React from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Title from '../../components/Title'
import Alert from '../../components/Alert'
import { useQuery, useMutation } from '../../lib/graphql'
import { useFormik} from 'formik'
import { useRouter } from 'next/router'

const DELETE_CATEGORY = `
mutation deleteCategory($id: String!) {
  deleteCategory (id: $id)
}
`
const CREATE_CATEGORY = `
        mutation createUser($name: String!, $slug: String!) {
            createCategory(input: {
                name: $name,
                slug: $slug
            }){
                id
                name
                slug
            }
        }
        `
const Index = () => {

    const router = useRouter()
  const [data, createCategory] = useMutation(CREATE_CATEGORY)
    const form = useFormik({
        initialValues: {
            name: '',
            slug: ''
        },
        onSubmit: async values => {
           await createCategory(values)
           router.push('/categories')
        }
    })
  return (
    <Layout>
      <Title>Criar nova categoria</Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/categories/create'>Criar categoria</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>


            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
                <form onSubmit={form.handleSubmit}>
                    <input type='text' name='name' onChange={form.handleChange} value={form.values.name}></input>
                    <input type='text' name='slug' onChange={form.handleChange} value={form.values.slug}></input>
                    <button type='submit'>Criar categoria</button>
                </form>


            </div>

        </div>
      </div>
    </Layout>
  )
}
export default Index
