import React, { Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
  Row, Col,
  Card, CardBody,
  
} from 'reactstrap';

import { ScheduleView } from '../../../../DemoPages/Components/ScheduleTable/ScheduleView';



const Calendar = () => {

  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition
          component="div"
          className="TabsAnimation"
          appear={true}
          timeout={0}
          enter={false}
          exit={false}>
          <Row>

            <Col md="12">
              <Card className="main-card">
                <CardBody>
                  {/* <AddEventButton />*/}
                  <ScheduleView
                    scheduleView={'month'}
                    height={700}
                  />
                </CardBody>
              </Card>

            </Col>

          </Row>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default Calendar