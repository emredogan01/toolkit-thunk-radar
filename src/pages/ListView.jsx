import {useSelector} from "react-redux"
import ReactPaginate from 'react-paginate';
import { useState } from "react";


const ListView = ({openModal}) => {

  const store = useSelector((store)=> store)

  const [itemOffset, setItemOffset] = useState(0);

  // sayfa başına eleman sayısı
  const itemsPerpage = 10

  // gösterilecek sonuncu elemanın sayısı
  const endOffset = itemOffset+ itemsPerpage
  
  // gösterikecek aralıktaki elemanlar
  const currentItems=store?.flights.slice(itemOffset, endOffset)

  // toplam kaç sayfa olduğunu hesaplama
  const pageCount=Math.ceil(store.flights.length / itemsPerpage) 
  
  const handlePageClick = (event)=>{

    // gösterilecek yeni elemanı hesaplar
    const newOffset = (event.selected * itemsPerpage) % store.flights.length;
    // state'i günceller
    setItemOffset(newOffset);
  }
  return (
    <div className="list-page">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <th>İd</th>
          <th>Kuyruk Kodu</th>
          <th>Enlem</th>
          <th>Boylam</th>
          <th></th>
        </thead>
        <tbody>
          {currentItems.map((flight)=>(
            <tr>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td><button onClick={()=>openModal(flight.id)}>Detay</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
      pageRangeDisplayed={2} 
      pageCount={pageCount}
      nextLabel="İleri >"
      previousLabel= "< Geri"
      className="pagination"
      activeClassName="active"
      onPageChange={handlePageClick} 
      />
    </div>
  )
}

export default ListView