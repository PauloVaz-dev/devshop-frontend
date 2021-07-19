import React, { useEffect} from 'react'
import Button from '../../../components/Button'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import { useRouter} from 'next/router'
import { useQuery, useUpload } from '../../../lib/graphql'
import { useFormik} from 'formik'

const UPDATE_BRAND_LOGO = `
    mutation uploadBrandLogo($id: String!, $file: Upload!) {
      uploadBrandLogo(
          id: $id,
        file: $file
    )
}
`
const Upload = () => {

    const router = useRouter()
    const { data } = useQuery(`
        query{
            getBrandById(id: "${router.query.id}"){
            id,
            name,
            slug
            }
        }
      `)
    const [updateData, setUploadBrand] = useUpload(UPDATE_BRAND_LOGO)
    const form = useFormik({
        initialValues: {
            id: router.query.id,
            file: '',
        },
        onSubmit: async values => {
            const brand = {
                ...values,
                id: router.query.id
            }

            setUploadBrand(brand)
            //router.push('/brands')
        }
    })


    return (
    <Layout>
      <Title>Uploda logo da marca {data && data.getBrandById && data.getBrandById.name}</Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className='mt-8'></div>

      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
                <form onSubmit={form.handleSubmit}>
                    <input type="file" name="file" onChange={ (event) => {
                        form.setFieldValue('file', event.target.files[0])
                    }}></input>
                    <Button>Salvar</Button>
                </form>
            </div>
        </div>
      </div>
    </Layout>
    )
}

export default Upload
