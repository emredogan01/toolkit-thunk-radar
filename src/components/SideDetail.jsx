import { useEffect, useState } from 'react'
import axios from 'axios';
import { detailOptions } from '../helpers/constants';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {useDispatch} from "react-redux"
import '@splidejs/react-splide/css';
import { setRoute } from '../redux/slices/flightSlice';

const SideDetail = ({ setShowDetail, detailId }) => {
    const [d, setDetail] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        // uçuş id'si her değiştiğinde önceki uçuşun detay verilerini sil
        // bu sayede geçişlerde loading tetiklenir
        setDetail(null)
        axios
            .get(`https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`, detailOptions)
            .then((res) => {setDetail(res.data); dispatch(setRoute(res.data.trail))})
    }, [detailId])
    console.log(d)

    return (
        <div className='detail-outer'>
            <div className='detail-inner'>
                <p className='close'>
                    <span onClick={() => setShowDetail(false)}>x</span>
                </p>

                {!d ? <p>Loading...</p> : (
                <>
                <h2>{d.aircraft.model?.text}</h2>
                <h2>{d.aircraft.model?.code}</h2>
                <p>Kuyruk No: {d.aircraft?.registration}</p>
                
                <Splide options={{
                    type: "loop",
                    autoWidth: true,
                }}>
                    {d.aircraft.images.large?.map((item, i)=>(
                        <SplideSlide key={i}>
                            <img className='airplane' src={item.src} alt="" />
                        </SplideSlide>
                    ))}
                </Splide>
                <p>Şirket: {d.airline?.name}</p>
                <p>
                    <span>Kalkış:</span>
                    <a target='_blank' href={d.airport.origin?.website}>{" "}{d.airport.origin?.name}</a>
                </p>
                <p>
                    <span>Hedef:</span>
                    <a target='_blank' href={d.airport.destination?.website}>{" "}{d.airport.destination?.name}</a>
                </p>
                <p>
                    <span>Durum: </span>
                    <span style={{background: d.status.icon, padding:"2px", borderRadius:"4px"}}>{d.status?.text}</span>
                </p>
                

                </>
                )} 
            </div>
        </div>
    )
}

export default SideDetail