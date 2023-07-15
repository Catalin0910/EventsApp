import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import heroOne from "../../_assets/_img/1 (2).png";
import heroTwo from "../../_assets/_img/creion.png";
import heroThird from "../../_assets/_img/third-hero.png";
import heroFourth from "../../_assets/_img/calendar.png";
import heroFive from "../../_assets/_img/prima.png";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import React from "react";
import $ from "jquery";
import "./LandingPage.css";
import { useHistory } from "react-router";

function LandingPage() {
  const history = useHistory();

  $(function () {
    $(document).scroll(function () {
      var $nav = $(".landing-nav");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
  });

  $(document).ready(() => {
    $(".second-hero").waypoint(
      () => {
        $(".second-hero").css({
          animation: "animate-heroes-left 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  $(document).ready(() => {
    $(".third-hero").waypoint(
      () => {
        $(".third-hero").css({
          animation: "animate-heroes-right 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  $(document).ready(() => {
    $(".fourth-hero").waypoint(
      () => {
        $(".fourth-hero").css({
          animation: "animate-heroes-left 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  $(document).ready(() => {
    $(".five-hero").waypoint(
      () => {
        $(".five-hero").css({
          animation: "animate-heroes-right 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  const script = document.createElement("script");
  script.src = "../../../public/_assets/js/jquery.waypoints.min.js";
  script.async = true;
  document.body.appendChild(script);

  return (
    <div className="landing-layout">
      <Navbar className="landing-nav" fixed="top">
        <Navbar.Brand href="#">DynamicEvents</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/signin">Log in</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <section id="header-section">
        <Row>
          <Col className="header-details-col">
            <h1 className="header-heading">
              Unforgotten <span className="header-head">Experiences</span>
            </h1>
            <p className="header-subheading">
              Find out the good out there for any of your desired services or if
              you own a business chose to define it easily with DynamicEvents.
            </p>
            <div className="header-btn-options">
              <Button
                className="btn btn-explore"
                variant="primary"
                onClick={() => {
                  history.push("/home");
                }}
              >
                Explore now
              </Button>
              <Button className="btn btn-integrate" variant="outline-primary">
                Integrate service
              </Button>
            </div>
          </Col>
          <Col>
            <img
              className="heroOne"
              src={heroFive}
              alt="Table with 6 persons"
            ></img>
          </Col>
        </Row>
      </section>
      <section id="second-section">
        <Container className="second-section-row">
          <Row>
            <Col>
              <img
                className="second-hero hero-left"
                src={heroTwo}
                alt="Vector graphic"
              ></img>
            </Col>
            <Col className="second-details-col">
              <h1 className="second-heading">
                Powering your <br></br> events to <br></br> everywhere.
              </h1>
              <p className="second-description">
               We look forward hearing from you about the events
               you want to organize
              </p>
              <Button
                className="btn btn-explore btn-expore-second"
                variant="secondary"
              >
                Explore now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="section-three">
        <Container>
          <Row className="third-row">
            <Col className="third-details">
              <h1 className="third-heading">
                See what <br></br>others said
              </h1>
              <p className="header-subheading">
                With DynamicEvents you can easily book a reservation for a restaurant
                or to a space for different activities and more. On top of that,
                you receive notification about your bookings.
              </p>
            </Col>
            <Col>
              <img
                className="third-hero hero-right"
                src={heroThird}
                alt="Review graphic"
              ></img>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="section-four">
        <Container className="second-section-row">
          <Row>
            <Col>
              <img
                className="fourth-hero hero-left"
                src={heroFourth}
                alt="Vector graphic"
              ></img>
            </Col>
            <Col className="fourth-details-col">
              <h1 className="fourth-heading">
                Smart booking <br></br> system
              </h1>
              <p className="second-description">
                With DynamicEvents you can easily book a reservation for a restaurant
                or to a space for different activities and more. On top of that,
                you receive notification about your bookings.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="section-five">
        <Container>
          <Row className="third-row">
            <Col className="third-details">
              <h1 className="third-heading">
                Find the good <br></br>out there
              </h1>
              <p className="header-subheading">
                Wide range of places or activities for you towards having a good
                time.
              </p>

              <Form className="five-form" inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-primary">Find now</Button>
              </Form>
            </Col>
            <Col>
              <img
                className="five-hero"
                src={heroOne}
                alt="Review graphic"
              ></img>
            </Col>
          </Row>
        </Container>
      </section>

      <footer>
        <Container className="footer-container">
          <Row>
            <Col>
              <p className="footer-logo">DynamicEvents </p>
            </Col>
            <Col>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="#">Log in</a>
                  </li>
                  <li>
                    <a href="#">Register</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col>
              <div className="footer-menu footer-ref">
                <ul>
                  <li>
                    <a href="http://www.freepik.com">
                      Designed by macrovector / Freepik
                    </a>
                  </li>
                  <li>
                    <a href="http://www.freepik.com">
                      Designed by pikisuperstar / Freepik
                    </a>
                  </li>
                  <li>
                    <a href="http://www.freepik.com">
                      Designed by katemangostar / Freepik
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default LandingPage;
