import useMyPackageStore from '../../../../store/useMyPackageStore'
import MyPlanCard from './MyPlanCard'
import './MyPlans.css'

export default function MyPlans() {
  const { myPackage } = useMyPackageStore()

  const investments = myPackage?.investments || []

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