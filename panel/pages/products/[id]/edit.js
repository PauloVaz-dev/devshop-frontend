import React, { useEffect} from 'react'
import Button from '../../../components/Button'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import Select from '../../../components/Select'
import { useRouter} from 'next/router'
import { useQuery, useMutation } from '../../../lib/graphql'
import { useFormik} from 'formik'

const Edit = () => {
    const GET_ALL_CATEGORIES = `
        query {
            getAllCategories{
                id
                name
                slug
            }
        }`

    const UPDATE_PRODUCT = `
        mutation updateProduct($id: String!, $name: String!, $slug: String!, $category: String!, $description: String!) {
            updateProduct(input: {
                id: $id,
                name: $name,
                slug: $slug,
                category: $category,
                description: $description
            }){
                id
                name
                slug
            }
        }
        `

    const router = useRouter()
    const { data } = useQuery(`
        query{
            getProductById(id: "${router.query.id}"){
            id,
            name,
            slug,
            description,
            category
            }
        }
      `)
    const [updateData, updateProduct] = useMutation(UPDATE_PRODUCT)
    const { data: categories, mutate, error } = useQuery(GET_ALL_CATEGORIES)
    const form = useFormik({
        initialValues: {
            name: '',
            slug: '',
            description: '',
            category: ''
        },
        onSubmit: async values => {
            const category = {
                ...values,
                id: router.query.id
            }
            const data = await updateProduct(category)
            if(data && !data.errors){
                router.push('/products')
            }

        }
    })

    useEffect(()=> {
        if(data && data.getProductById){
            form.setFieldValue('name', data.getProductById.name)
            form.setFieldValue('slug', data.getProductById.slug)
            form.setFieldValue('description', data.getProductById.description)
            form.setFieldValue('category', data.getProductById.category)
        }
    }, [data])

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
      <Title>Editar produto</Title>
      <div className='mt-8'></div>

      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>

            {
                updateData && !!updateData.errors && <h1>Error</h1>
            }
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
                <form onSubmit={form.handleSubmit}>
                    <input type='text' name='name' onChange={form.handleChange} value={form.values.name}></input>
                    <input type='text' name='slug' onChange={form.handleChange} value={form.values.slug}></input>
                    <input type='text' name='description' onChange={form.handleChange} value={form.values.description}></input>
                    <Select
                        lable='Selecione a categoria'
                        name='category'
                        onChange={form.handleChange}
                        value={form.values.category}
                        options={options}
                    >

                    </Select>
                    <button type='submit'>Salvar</button>
                </form>


            </div>

        </div>
      </div>
    </Layout>
    )
}

export default Edit
