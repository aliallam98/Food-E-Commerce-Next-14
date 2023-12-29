import React from 'react'
import CreateProductModel from './CreateProductModel'
import { DataTable } from './data-table'
import { Payment, columns } from "./columns";


const ProductPage = () => {
  // const Categories = await getAllProduct()
  return (
    <section>
      <div className="container py-10">
      <h2 className='text-center text-3xl font-semibold'>Products Page</h2>
      <div>
        <CreateProductModel/>
      </div>
      <div>
      {/* <DataTable columns={columns} data={Categories} /> */}
      </div>
      </div>
    </section>
  )
}

export default ProductPage