import Link from 'next/link'
import React from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Title from '../../components/Title'
import Alert from '../../components/Alert'
import Select from '../../components/Select'
import { useQuery, useMutation } from '../../lib/graphql'
import { useFormik} from 'formik'
import { useRouter } from 'next/router'

const GET_ALL_CATEGORIES = `
        query {
            getAllCategories{
                id
                name
                slug
            }
        }
        `

const CREATE_PRODUCT = `
        mutation createProduct($name: String!, $slug: String!, $description: String!, $category: String!) {
            createProduct(input: {
                name: $name,
                slug: $slug,
                category: $category,
                description: $description

            }){
                id
                name
                slug
                description
            }
        }
        `
const Index = () => {

    const router = useRouter()
    const { data: categories, mutate, error } = useQuery(GET_ALL_CATEGORIES)

    const [productData, createProduct] = useMutation(CREATE_PRODUCT)
    const form = useFormik({
        initialValues: {
            name: '',
            slug: '',
            description: '',
            category: ''
        },
        onSubmit: async values => {
           const data = await createProduct(values)
           router.push('/products')
        }
    })

    let options = []
    if(categories && categories.getAllCategories){
        options = categories.getAllCategories.map( item => {
            return {
                id: item.id,
                label: item.name
            }
        })
    }
  return (
    <Layout>
      <Title>Criar novo produto</Title>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/products'>Voltar</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>


            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
                <form onSubmit={form.handleSubmit}>
                    <input type='text' name='name' onChange={form.handleChange} value={form.values.name}></input>
                    <input type='text' name='slug' onChange={form.handleChange} value={form.values.slug}></input>
                    <input type='text' name='description' onChange={form.handleChange} value={form.values.description}></input>


                    <Select
                        lable='Selecione a categoria'
                        name='category'
                        onChange={form.handleChange}
                        value={form.values.name}
                        options={options}
                    >

                    </Select>
                    <button type='submit'>Criar produto</button>
                </form>


            </div>

        </div>
      </div>
    </Layout>
  )
}
export default Index
