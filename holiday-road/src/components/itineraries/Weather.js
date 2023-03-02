import { useContext, useEffect } from "react"
import { Provider } from "./Provider"

export const Weather = ({selectPark}) => {
    const { forecast, getForecast } = useContext(Provider)

  useEffect(() => {
    const lat = parseFloat(selectPark.latitude).toFixed(4)
    const long = parseFloat(selectPark.longitude).toFixed(4)
    getForecast(lat, long)
  }, [selectPark])

  return <>
  <h2>Weather for {selectPark.fullName}</h2>
  </>
}