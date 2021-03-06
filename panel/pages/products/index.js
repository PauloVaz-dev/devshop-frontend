import Link from 'next/link'
import React from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Title from '../../components/Title'
import Alert from '../../components/Alert'
import { useQuery, useMutation } from '../../lib/graphql'

const DELETE_PRODUCTS = `
mutation deleteProduct($id: String!) {
    deleteProduct (id: $id)
}
`
const GET_ALL_PRODUCTS = `
        query {
            getAllProducts{
                id
                name
                slug
            }
        }
        `

const Index = () => {
  const { data, mutate, error } = useQuery(GET_ALL_PRODUCTS)
  const [deleteData, deleteProduct] = useMutation(DELETE_PRODUCTS)
  const remove = id => async () => {
    await deleteProduct({ id })
    mutate()
  }
  return (
    <Layout>
      <Title>Gerenciar produtos</Title>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/products/create'>Criar produtos</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.getAllProducts && data.getAllProducts.length === 0 && (
            <Alert>
              <p>Nenhum produto criada até o momento.</p>
            </Alert>
          )}
          {data && data.getAllProducts && data.getAllProducts.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
              <Table>
                <Table.Head>
                  <Table.Th>Produtos</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>

                <Table.Body>
                  {data &&
                    data.getAllProducts &&
                    data.getAllProducts.map(item => {
                      return (
                        <Table.Tr key={item.id}>
                          <Table.Td>
                            <div className='flex items-center'>
                              <div>
                                <div className='text-sm leading-5 font-medium text-gray-900'>
                                  {item.name}
                                </div>
                                <div className='text-sm leading-5 text-gray-500'>
                                  {item.slug}
                                </div>
                              </div>
                            </div>
                          </Table.Td>

                          <Table.Td>
                            <Link href={`/products/${item.id}/edit`}>
                              <a className='text-indigo-600 hover:text-indigo-900'>
                                Edit
                              </a>
                            </Link>{' '}
                            |{' '}
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                              onClick={remove(item.id)}
                            >
                              Remove
                            </a>
                          </Table.Td>
                        </Table.Tr>
                      )
                    })}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default Index
