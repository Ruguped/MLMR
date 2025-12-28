import { useQuery } from '@tanstack/react-query'
import api from '../../../../libs/api'
import MyPlanCard from './MyPlanCard'
import './MyPlans.css'



const getMyPackages = async () => {
  const response = await api.get('/api/Investment/my-packages');
  return response.data
}


export default function MyPlans() {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-packages'],
    queryFn: getMyPackages
  })
  if (isLoading) {
    return (
      <div className="row">
        <div className="col-12 text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="row">
        <div className="col-12 text-center py-5">
          <p className="text-danger">Error loading packages................</p>
        </div>
      </div>
    )
  }

  const investments = data?.investments || []

  if (investments.length === 0) {
    return (
      <div className="row">
        <div className="col-12 text-center py-5">
          <p>You haven't purchased any packages yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      {investments.map(investment => (
        <div className="col-sm-4" key={investment.id}>
          <MyPlanCard {...investment} />
        </div>
      ))}
    </div>
  )
}