import { useContext, useEffect } from "react"
import { Provider } from "./Provider"

export const Weather = ({park, forecast}) => {
return <>
  <h2>5 Day Forecast for {park}</h2>
  <table>
    <thead>
    <tr>
      <th></th>
      <th>{forecast?.daily?.time[1]}</th>
      <th>{forecast?.daily?.time[2]}</th>
      <th>{forecast?.daily?.time[3]}</th>
      <th>{forecast?.daily?.time[4]}</th>
      <th>{forecast?.daily?.time[5]}</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>High</td>
      <td>{forecast?.daily?.temperature_2m_max[1]} °F</td>
      <td>{forecast?.daily?.temperature_2m_max[2]} °F</td>
      <td>{forecast?.daily?.temperature_2m_max[3]} °F</td>
      <td>{forecast?.daily?.temperature_2m_max[4]} °F</td>
      <td>{forecast?.daily?.temperature_2m_max[5]} °F</td>
    </tr>
    <tr>
      <td>Low</td>
      <td>{forecast?.daily?.temperature_2m_min[1]} °F</td>
      <td>{forecast?.daily?.temperature_2m_min[2]} °F</td>
      <td>{forecast?.daily?.temperature_2m_min[3]} °F</td>
      <td>{forecast?.daily?.temperature_2m_min[4]} °F</td>
      <td>{forecast?.daily?.temperature_2m_min[5]} °F</td>
    </tr>
    <tr>
      <td>Chance of Rain</td>
      <td>{forecast?.daily?.precipitation_probability_mean[1]}%</td>
      <td>{forecast?.daily?.precipitation_probability_mean[2]}%</td>
      <td>{forecast?.daily?.precipitation_probability_mean[3]}%</td>
      <td>{forecast?.daily?.precipitation_probability_mean[4]}%</td>
      <td>{forecast?.daily?.precipitation_probability_mean[5]}%</td>
    </tr>
    </tbody>
  </table>
  </>
}