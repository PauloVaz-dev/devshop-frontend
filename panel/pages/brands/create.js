import Link from 'next/link'
import React from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Alert from '../../components/Alert'
import { useQuery, useMutation } from '../../lib/graphql'
import { useFormik} from 'formik'
import { useRouter } from 'next/router'

const CREATE_BRAND = `
        mutation createBrand($name: String!, $slug: String!) {
            createBrand(input: {
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
  const [data, createBrand] = useMutation(CREATE_BRAND)
    const form = useFormik({
        initialValues: {
            name: '',
            slug: ''
        },
        onSubmit: async values => {
           await createBrand(values)
           router.push('/brands')
        }
    })
  return (
    <Layout>
      <Title>Criar nova marca</Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/brands/create'>Criar marca</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>


            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
                <form onSubmit={form.handleSubmit}>
                    <input type='text' name='name' onChange={form.handleChange} value={form.values.name}></input>
                    <input type='text' name='slug' onChange={form.handleChange} value={form.values.slug}></input>
                    <button type='submit'>Criar marca</button>
                </form>


            </div>

        </div>
      </div>
    </Layout>
  )
}
export default Index
