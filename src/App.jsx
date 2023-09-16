import { useEffect, useState } from "react"
import Header from "./components/Header"
import MapView from "./pages/MapView"
import ListView from "./pages/ListView"
import { useDispatch } from "react-redux"
import { getFlights } from "./redux/actions/flightActions"
import SideDetail from "./components/SideDetail"
function App() {
  const dispatch= useDispatch();
  const [showMapView, setShowMapView] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState();

  useEffect(()=>{

    // ? 5 saniye aralıkla sürekli istek atma
    // const ref = setInterval(()=>{
    //   dispatch(getFlights())
    // },5000)

    // ? kullanıcı farklı sayfaya geçtiğinde tekrarı dururma
    // return()=>{
    //   clearInterval(ref)
    // }

    dispatch(getFlights())
  },[])


  const openModal = (id)=>{
    // detayı gösterecek uçağın id'sini state'e aktarma
    setDetailId(id)

    // modal'ı açma
    setShowDetail(true)
  }


  return (
    <>
      <Header />
      <div className="view-buttons">
        <button className={showMapView ? "active" : ""} onClick={() => setShowMapView(true)}>Harita Görünümü</button>
        <button className={!showMapView ? "active" : ""}  onClick={() => setShowMapView(false)}>Liste Görünümü</button>
      </div>

      {
        showMapView ? <MapView openModal={openModal} /> : <ListView openModal={openModal} />
      }

      {showDetail && <SideDetail detailId={detailId} setShowDetail={setShowDetail}/>}

    </>
  )
}

export default App
