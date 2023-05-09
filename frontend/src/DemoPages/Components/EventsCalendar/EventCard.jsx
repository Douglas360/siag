import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import { Button } from "reactstrap"

const EventCard = ({ event }) => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="mr-3">
          <div className="badge badge-pill badge-success">8:00 AM</div>

        </div>
        <div>
          <div className="font-weight-bold">
            {event.title}
          </div>
          <div className="opacity-5">
            <div className="d-inline-block mr-2">
              <b className="text-dark">Local:</b> {event.location}
            </div>
            <div className="d-inline-block">
              <b className="text-dark">Data:</b> {moment(event.start).format('DD/MM/YYYY')}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <Button size="sm" color="link" className="btn-pill btn-wide">
          <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
        </Button>
      </div>
    </div>

  )
}

export default EventCard