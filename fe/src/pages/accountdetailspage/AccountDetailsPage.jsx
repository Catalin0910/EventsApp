import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AccountDetailsPage.css";
import RocketImage from "../../_assets/_img/7750-[Converted].png";
import AuthService from "../../services/auth/auth.service";
import SubscriptionService from "../../services/subscription/subscription.service";
import BusinessService from "../../services/business/business.service";
import AccountDetailsService from "../../services/account-details/accountdetails.service";
import cogoToast from "cogo-toast";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router";

function AccountDetailsPage() {
  const currentUser = AuthService.getLoggedUser();
  const workingDays = [
    "Monday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceEmail, setServiceEmail] = useState("");
  const [servicePhone, setServicePhone] = useState("");
  const [serviceCity, setServiceCity] = useState("");
  const [serviceStreet, setServiceStreet] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [isServiceOwner, setIsServiceOwner] = useState(true);
  const [file, setFile] = useState(null);
  const history = useHistory();
  let workingSchedule = [];

  useEffect(() => {
    SubscriptionService.getSubscriptions().then((res) => {
      const subs = res.data;
      subs.splice(0, 1);
      setSubscriptions(subs);
    });
    if (currentUser.roles.length === 1) {
      setIsServiceOwner(false);
      console.log(currentUser.roles.length);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isServiceOwner) {
      AccountDetailsService.saveUserDetails(
        {
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
        },
        currentUser.token,
        currentUser.id,
        1
      )
        .then(() => {
          history.push("/home");
        })
        .catch((err) => console.log(err.message));
    } else {
      let container = document.getElementById("working-hours-container");
      console.log(container.childNodes);
      let isValid = true;
      container.childNodes.forEach((element) => {
        if (element.childNodes[0].childNodes[0].childNodes[0].checked) {
          let checkedDaysSchedule = {};

          let dayOfWeek =
            element.childNodes[0].childNodes[0].childNodes[1].innerText;

          let startingHour =
            element.childNodes[1].childNodes[0].childNodes[0].value;
          if (startingHour === "") {
            cogoToast.error(
              "Please fill in the starting hour for the selected days"
            );
            isValid = false;
          }

          let endingHour =
            element.childNodes[2].childNodes[0].childNodes[0].value;
          if (endingHour === "") {
            cogoToast.error(
              "Please fill in the ending hour for the selected days"
            );
            isValid = false;
          }
          if (isValid) {
            checkedDaysSchedule.dayOfWeek = dayOfWeek;
            checkedDaysSchedule.startingHour = startingHour;
            checkedDaysSchedule.closeHour = endingHour;
            workingSchedule.push(checkedDaysSchedule);
          }
        }
      });

      let validInputs = true;
      //TODO: validate inputs
      if (validInputs) {
        let serviceAddress = serviceStreet + " " + serviceNumber;
        let serviceCategory = document.querySelector(".serviceCategory").value;
        let subscriptionType = document.querySelector(".subscriptionType")
          .value;

        AccountDetailsService.saveUserDetails(
          {
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
          },
          currentUser.token,
          currentUser.id,
          subscriptionType
        )
          .then(() => {
            BusinessService.saveBusiness(
              {
                serviceName: serviceName,
                serviceEmail: serviceEmail,
                servicePhone: servicePhone,
                serviceDescription: serviceDescription,
                category: serviceCategory.toUpperCase(),
                address: serviceAddress,
                city: serviceCity,
                rating: 0.0,
                workingHoursList: workingSchedule,
              },
              currentUser.token,
              currentUser.id
            )
              .then(() => {
                history.push("/home");
              })
              .catch((err) => console.log(err.message));
          })
          .catch((err) => console.log(err.message));
      }
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  return (
    <div className="detailsPage-container">
      <Row className="greetings-container">
        <Col sm={7} className="greetings-block-col">
          <div className="greetings-block">
            <h1 className="greetings-heading">Hi {currentUser.username}!</h1>
            <p className="greetings-message">
              We are glad to see that you want to integrate your event in our
              hub. Please provide us a few more infos about you and your
              event before we get started.
            </p>
          </div>
        </Col>
        <Col sm={4}>
          <div className="greetings-image">
            <img src={RocketImage} alt="rocket" className="greetings-rocket" />
          </div>
        </Col>
      </Row>
      <Row className="additional-details-form-row">
        <div className="additional-details-form">
          <Form className="details-form">
            <h3 className="details-form-headThree">Personal Details</h3>
            <Form.Group controlId="formFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of birth"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            {isServiceOwner === true && (
              <>
                <h3 className="details-form-headThree">Event details</h3>
                <p>
                  If you don't have all the details needed below you can also
                  complete later in the application dashboard.
                </p>
                <Form.Group controlId="formServiceName">
                  <Form.Label>Event name</Form.Label>
                  <Form.Text className="text-muted">
                    The name of your service is very important towards promoting
                    it.
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter service name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formServiceEmail">
                  <Form.Label>Event email</Form.Label>
                  <Form.Text className="text-muted">
                    Having a event email can create new threads for
                    communications.
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter service email"
                    value={serviceEmail}
                    onChange={(e) => setServiceEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formServicePhone">
                  <Form.Label>Event organiser phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter service phone"
                    value={servicePhone}
                    onChange={(e) => setServicePhone(e.target.value)}
                  />
                </Form.Group>
                <h5>Event location</h5>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter service city"
                    value={serviceCity}
                    onChange={(e) => setServiceCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter service street"
                    value={serviceStreet}
                    onChange={(e) => setServiceStreet(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formServiceStreetNumber">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter service street number"
                    value={serviceNumber}
                    onChange={(e) => setServiceNumber(e.target.value)}
                  />
                </Form.Group>
                <h5>Event Profile</h5>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Text className="text-muted">
                    Provide a short engaging description of your service and its
                    benefits for your customers.
                  </Form.Text>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formServiceCategory">
                  <Form.Label>Event category</Form.Label>
                  <Form.Text className="text-muted">
                    Choosing a category for your event will make it easier to
                    be find by the possible clients.
                  </Form.Text>
                  <Form.Control
                    as="select"
                    controlid="serviceCategory"
                    className="serviceCategory"
                  >
                    <option value="healthy">Wedding</option>
                    <option value="relax">Child birthday</option>
                    <option value="social">Social</option>
                    <option value="beauty">Beauty</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formServiceCategory">
                  <Form.Label>Event more categories</Form.Label>
                  <Form.Text className="text-muted">
                    Choosing a category for your event will make it easier to
                    be find by the possible clients.
                  </Form.Text>
                  <Form.Control
                    as="select"
                    controlid="serviceCategory"
                    className="serviceCategory"
                  >
                    <option value="healthy">Photograph/Video</option>
                    <option value="other">None</option>
                  </Form.Control>
                  <br></br>
                  <Form.Control
                    as="select"
                    controlid="serviceCategory"
                    className="serviceCategory"
                  >
                    <option value="healthy">Normal meniu</option>
                    <option value="other">Vegan meniu</option>
                    <option value="other">Another catering company</option>
                  </Form.Control>
                  <br></br>
                  <Form.Control
                    as="select"
                    controlid="serviceCategory"
                    className="serviceCategory"
                  >
                    <option value="healthy">Lights/fireworks</option>
                    <option value="other">Other</option>
                  </Form.Control>
                  <br></br>
                  <Form.Control
                    as="select"
                    controlid="serviceCategory"
                    className="serviceCategory"
                  >
                    <option value="healthy">Normal system audio</option>
                    <option value="healthy">Conference system audio</option>
                    <option value="other">Other</option>
                  </Form.Control>
                  <br></br>
                  <Form.Text className="text-muted">
                   Choose range price
                  </Form.Text>
                  <Form.Control
                    as="select"
                    controlid="serviceCategory"
                    className="serviceCategory"
                  >
                    <option value="healthy">2000-3000</option>
                    <option value="healthy">4000-7000</option>
                    <option value="healthy">5000-8000</option>
                    <option value="healthy">8000-10000</option>
                    <option value="healthy">10000-15000</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
                <h5>Working hours</h5>
                <p className="working-hours-description">
                  Please check below the available days of your service and also
                  fill the working hours for each selected day. <br></br>
                  <b>
                    You can update this schedule whenever you want in the
                    application dashboard.{" "}
                  </b>
                </p>

                <Col id="working-hours-container">
                  {workingDays.map((workingDay) => {
                    return (
                      <Row key={`row-${workingDay}`} id="workingDay-row">
                        <Col>
                          <Form.Check
                            type="checkbox"
                            id={`check-${workingDay}`}
                            label={`${workingDay}`}
                          />
                        </Col>
                        <Col>
                          <Form.Group controlId="startingHour">
                            <Form.Control
                              controlid={`check-starting-${workingDay}`}
                              type="number"
                              placeholder="from"
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="endingHour">
                            <Form.Control
                              controlid={`check-starting-${workingDay}`}
                              type="number"
                              placeholder="to"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    );
                  })}
                </Col>

                {/* <h3 className="details-form-headThree">Subscription</h3>
                <p className="working-hours-description">
                  The payment will be processed by a third party after
                  submitting the form.
                </p>
                <Form.Control
                  as="select"
                  controlid="subscriptionType"
                  className="subscriptionType"
                >
                  <option value="2">Monthly</option>
                  <option value="3">Annual</option>
                </Form.Control> */}

                <div className="subscription-container">
                  {subscriptions.map((elem) => {
                    return (
                      <div
                        key={elem.type}
                        className={`card-container card-${elem.type}-container`}
                      >
                        <Card id={`card-${elem.type}`}>
                          <Card.Body>
                            <Card.Title>{elem.type} payments</Card.Title>
                            <Card.Subtitle>
                              {elem.subscriptionPrice} RON
                            </Card.Subtitle>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <Button
              color="#BF40BF"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Start Exploring
            </Button>
          </Form>
        </div>
      </Row>
    </div>
  );
}

export default AccountDetailsPage;
