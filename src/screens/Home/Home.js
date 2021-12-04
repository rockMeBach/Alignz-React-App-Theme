import React from "react";
import "./Home.scss";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/features-3.png";
import image4 from "../../assets/images/features-2.png";
import image5 from "../../assets/images/features.png";
const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg pt-3 sticky-top">
        <div className="container" style={{ width: "1100px" }}>
          <a className="navbar-brand1" href="#">
            UnFluke
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link px-4">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Why Mixing?</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Fee</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">FAQ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4">Support</a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li>
                {" "}
                <a className="btn btn-login mr-3" href="/login">
                  Login
                </a>
              </li>
              <li>
                {" "}
                <a className="btn btn-signup" href="/registration">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "rgb(224,213,252)",
          height: "700px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="row">
          <div className="col-sm-12 col-md-5">
            <h1
              className="pt-5 mt-5 ml-5"
              style={{ fontSize: "64px", fontWeight: "900" }}
            >
              Make your Trades with Us
            </h1>
            <p className="ml-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              purus a odio finibus bibendum amet leo.
            </p>
            <div class="mt-4">
              <a
                className="btn btn-login ml-5 "
                href="/login"
                style={{ width: "150px" }}
              >
                {" "}
                Login
              </a>
            </div>
          </div>
          <div className="col-sm-12 col-md-7">
            <img src={image1} className="img-fluid" alt="" />
          </div>
        </div>
      </div>

      <section id="values" class="values">
        <div class="container" data-aos="fade-up">
          <header class="section-header">
            <h2>Our Values</h2>
            <p>Odit est perspiciatis laborum et dicta</p>
          </header>

          <div class="row">
            <div class="col-lg-4">
              <div class="box" data-aos="fade-up" data-aos-delay="200">
                <img src={image2} class="img-fluid" alt="" />
                <h3>Ad cupiditate sed est odio</h3>
                <p>
                  Eum ad dolor et. Autem aut fugiat debitis voluptatem
                  consequuntur sit. Et veritatis id.
                </p>
              </div>
            </div>

            <div class="col-lg-4 mt-4 mt-lg-0">
              <div class="box" data-aos="fade-up" data-aos-delay="400">
                <img src={image2} class="img-fluid" alt="" />
                <h3>Voluptatem voluptatum alias</h3>
                <p>
                  Repudiandae amet nihil natus in distinctio suscipit id.
                  Doloremque ducimus ea sit non.
                </p>
              </div>
            </div>

            <div class="col-lg-4 mt-4 mt-lg-0">
              <div class="box" data-aos="fade-up" data-aos-delay="600">
                <img src={image2} class="img-fluid" alt="" />
                <h3>Fugit cupiditate alias nobis.</h3>
                <p>
                  Quam rem vitae est autem molestias explicabo debitis sint.
                  Vero aliquid quidem commodi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="features">
        <div class="container" data-aos="fade-up">
          <header class="section-header">
            <h2>Features</h2>
            <p>Laboriosam et omnis fuga quis dolor direda fara</p>
          </header>

          <div class="row">
            <div class="col-lg-6">
              <img src={image5} class="img-fluid" alt="" />
            </div>

            <div class="col-lg-6 mt-5 mt-lg-0 d-flex">
              <div class="row align-self-center gy-4">
                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="200">
                  <div class="feature-box d-flex align-items-center">
                    <i class="bi bi-check"></i>
                    <h3>Eos aspernatur rem</h3>
                  </div>
                </div>

                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="300">
                  <div class="feature-box d-flex align-items-center">
                    <i class="bi bi-check"></i>
                    <h3>Facilis neque ipsa</h3>
                  </div>
                </div>

                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="400">
                  <div class="feature-box d-flex align-items-center">
                    <i class="bi bi-check"></i>
                    <h3>Volup amet voluptas</h3>
                  </div>
                </div>

                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="500">
                  <div class="feature-box d-flex align-items-center">
                    <i class="bi bi-check"></i>
                    <h3>Rerum omnis sint</h3>
                  </div>
                </div>

                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="600">
                  <div class="feature-box d-flex align-items-center">
                    <i class="bi bi-check"></i>
                    <h3>Alias possimus</h3>
                  </div>
                </div>

                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="700">
                  <div class="feature-box d-flex align-items-center">
                    <i class="bi bi-check"></i>
                    <h3>Repellendus mollitia</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row feture-tabs mt-5 pt-5" data-aos="fade-up">
            <div class="col-lg-6">
              <h3>
                Neque officiis dolore maiores et exercitationem quae est seda
                lidera pat claero
              </h3>

              <ul class="nav nav-pills mb-3">
                <li>
                  <a class="nav-link active" data-bs-toggle="pill" href="#tab1">
                    Saepe fuga
                  </a>
                </li>
                <li>
                  <a class="nav-link" data-bs-toggle="pill" href="#tab2">
                    Voluptates
                  </a>
                </li>
                <li>
                  <a class="nav-link" data-bs-toggle="pill" href="#tab3">
                    Corrupti
                  </a>
                </li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab1">
                  <p>
                    Consequuntur inventore voluptates consequatur aut vel et.
                    Eos doloribus expedita. Sapiente atque consequatur minima
                    nihil quae aspernatur quo suscipit voluptatem.
                  </p>
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-check2"></i>
                    <h4>
                      Repudiandae rerum velit modi et officia quasi facilis
                    </h4>
                  </div>
                  <p>
                    Laborum omnis voluptates voluptas qui sit aliquam
                    blanditiis. Sapiente minima commodi dolorum non eveniet
                    magni quaerat nemo et.
                  </p>
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-check2"></i>
                    <h4>Incidunt non veritatis illum ea ut nisi</h4>
                  </div>
                  <p>
                    Non quod totam minus repellendus autem sint velit. Rerum
                    debitis facere soluta tenetur. Iure molestiae assumenda sunt
                    qui inventore eligendi voluptates nisi at. Dolorem quo
                    tempora. Quia et perferendis.
                  </p>
                </div>

                <div class="tab-pane fade show" id="tab2">
                  <p>
                    Consequuntur inventore voluptates consequatur aut vel et.
                    Eos doloribus expedita. Sapiente atque consequatur minima
                    nihil quae aspernatur quo suscipit voluptatem.
                  </p>
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-check2"></i>
                    <h4>
                      Repudiandae rerum velit modi et officia quasi facilis
                    </h4>
                  </div>
                  <p>
                    Laborum omnis voluptates voluptas qui sit aliquam
                    blanditiis. Sapiente minima commodi dolorum non eveniet
                    magni quaerat nemo et.
                  </p>
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-check2"></i>
                    <h4>Incidunt non veritatis illum ea ut nisi</h4>
                  </div>
                  <p>
                    Non quod totam minus repellendus autem sint velit. Rerum
                    debitis facere soluta tenetur. Iure molestiae assumenda sunt
                    qui inventore eligendi voluptates nisi at. Dolorem quo
                    tempora. Quia et perferendis.
                  </p>
                </div>

                <div class="tab-pane fade show" id="tab3">
                  <p>
                    Consequuntur inventore voluptates consequatur aut vel et.
                    Eos doloribus expedita. Sapiente atque consequatur minima
                    nihil quae aspernatur quo suscipit voluptatem.
                  </p>
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-check2"></i>
                    <h4>
                      Repudiandae rerum velit modi et officia quasi facilis
                    </h4>
                  </div>
                  <p>
                    Laborum omnis voluptates voluptas qui sit aliquam
                    blanditiis. Sapiente minima commodi dolorum non eveniet
                    magni quaerat nemo et.
                  </p>
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-check2"></i>
                    <h4>Incidunt non veritatis illum ea ut nisi</h4>
                  </div>
                  <p>
                    Non quod totam minus repellendus autem sint velit. Rerum
                    debitis facere soluta tenetur. Iure molestiae assumenda sunt
                    qui inventore eligendi voluptates nisi at. Dolorem quo
                    tempora. Quia et perferendis.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <img src={image4} class="img-fluid" alt="" />
            </div>
          </div>

          <div class="row feature-icons" data-aos="fade-up">
            <h3>Ratione mollitia eos ab laudantium rerum beatae quo</h3>

            <div class="row">
              <div
                class="col-xl-4 text-center"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <img src={image3} class="img-fluid p-4" alt="" />
              </div>

              <div class="col-xl-8 d-flex content">
                <div class="row align-self-center gy-4">
                  <div class="col-md-6 icon-box" data-aos="fade-up">
                    <i class="ri-line-chart-line"></i>
                    <div>
                      <h4>Corporis voluptates sit</h4>
                      <p>
                        Consequuntur sunt aut quasi enim aliquam quae harum
                        pariatur laboris nisi ut aliquip
                      </p>
                    </div>
                  </div>

                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i class="ri-stack-line"></i>
                    <div>
                      <h4>Ullamco laboris nisi</h4>
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt
                      </p>
                    </div>
                  </div>

                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i class="ri-brush-4-line"></i>
                    <div>
                      <h4>Labore consequatur</h4>
                      <p>
                        Aut suscipit aut cum nemo deleniti aut omnis. Doloribus
                        ut maiores omnis facere
                      </p>
                    </div>
                  </div>

                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i class="ri-magic-line"></i>
                    <div>
                      <h4>Beatae veritatis</h4>
                      <p>
                        Expedita veritatis consequuntur nihil tempore laudantium
                        vitae denat pacta
                      </p>
                    </div>
                  </div>

                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i class="ri-command-line"></i>
                    <div>
                      <h4>Molestiae dolor</h4>
                      <p>
                        Et fuga et deserunt et enim. Dolorem architecto ratione
                        tensa raptor marte
                      </p>
                    </div>
                  </div>

                  <div
                    class="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <i class="ri-radar-line"></i>
                    <div>
                      <h4>Explicabo consectetur</h4>
                      <p>
                        Est autem dicta beatae suscipit. Sint veritatis et sit
                        quasi ab aut inventore
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="testimonial">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-none d-lg-block">
              <ol class="carousel-indicators tabs">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  class="active"
                >
                  <figure>
                    <img
                      src="https://livedemo00.template-help.com/wt_62267_v8/prod-20823-one-service/images/testimonials-01-179x179.png"
                      class="img-fluid"
                      alt=""
                    />
                  </figure>
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1">
                  <figure>
                    <img
                      src="https://livedemo00.template-help.com/wt_62267_v8/prod-20823-one-service/images/testimonials-02-306x306.png"
                      class="img-fluid"
                      alt=""
                    />
                  </figure>
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2">
                  <figure>
                    <img
                      src="https://livedemo00.template-help.com/wt_62267_v8/prod-20823-one-service/images/testimonials-03-179x179.png"
                      class="img-fluid"
                      alt=""
                    />
                  </figure>
                </li>
              </ol>
            </div>
            <div class="col-lg-6 d-flex justify-content-center align-items-center">
              <div
                id="carouselExampleIndicators"
                data-interval="false"
                class="carousel slide"
                data-ride="carousel"
              >
                <h3>WHAT OUR CLIENTS SAY</h3>
                <h1>TESTIMONIALS</h1>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="quote-wrapper">
                      <p>
                        I have tried a lot of food delivery services but Plate
                        is something out of this world! Their food is really
                        healthy and it tastes great, which is why I recommend
                        this company to all my friends!
                      </p>
                      <h3>peter lee</h3>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="quote-wrapper">
                      <p>
                        I have tried a lot of food delivery services but Plate
                        is something out of this world! Their food is really
                        healthy and it tastes great, which is why I recommend
                        this company to all my friends!
                      </p>
                      <h3>peter lee</h3>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="quote-wrapper">
                      <p>
                        I have tried a lot of food delivery services but Plate
                        is something out of this world! Their food is really
                        healthy and it tastes great, which is why I recommend
                        this company to all my friends!
                      </p>
                      <h3>peter lee</h3>
                    </div>
                  </div>
                </div>
                <ol class="carousel-indicators indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    class="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="faq_area section_padding_130" id="faq">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-lg-6">
              <div
                class="section_heading text-center wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                <h3>
                  <span>Frequently </span> Asked Questions
                </h3>
                <p>
                  Appland is completely creative, lightweight, clean &amp; super
                  responsive app landing page.
                </p>
                <div class="line"></div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-lg-8">
              <div class="accordion faq-accordian" id="faqAccordion">
                <div
                  class="card border-0 wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div class="card-header" id="headingOne">
                    <h6
                      class="mb-0 collapsed"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How can I install this app?
                      <span class="lni-chevron-up"></span>
                    </h6>
                  </div>
                  <div
                    class="collapse"
                    id="collapseOne"
                    aria-labelledby="headingOne"
                    data-parent="#faqAccordion"
                  >
                    <div class="card-body">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Architecto quidem facere deserunt sint animi sapiente
                        vitae suscipit.
                      </p>
                      <p>
                        Appland is completely creative, lightweight, clean &amp;
                        super responsive app landing page.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="card border-0 wow fadeInUp"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div class="card-header" id="headingTwo">
                    <h6
                      class="mb-0 collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      The apps isn't installing?
                      <span class="lni-chevron-up"></span>
                    </h6>
                  </div>
                  <div
                    class="collapse"
                    id="collapseTwo"
                    aria-labelledby="headingTwo"
                    data-parent="#faqAccordion"
                  >
                    <div class="card-body">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Architecto quidem facere deserunt sint animi sapiente
                        vitae suscipit.
                      </p>
                      <p>
                        Appland is completely creative, lightweight, clean &amp;
                        super responsive app landing page.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="card border-0 wow fadeInUp"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div class="card-header" id="headingThree">
                    <h6
                      class="mb-0 collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      Contact form isn't working?
                      <span class="lni-chevron-up"></span>
                    </h6>
                  </div>
                  <div
                    class="collapse"
                    id="collapseThree"
                    aria-labelledby="headingThree"
                    data-parent="#faqAccordion"
                  >
                    <div class="card-body">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Architecto quidem facere deserunt sint animi sapiente
                        vitae suscipit.
                      </p>
                      <p>
                        Appland is completely creative, lightweight, clean &amp;
                        super responsive app landing page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="support-button text-center d-flex align-items-center justify-content-center mt-4 wow fadeInUp"
                data-wow-delay="0.5s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                <i class="lni-emoji-sad"></i>
                <p class="mb-0 px-2">Can't find your answers?</p>
                <a href="#"> Contact us</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-newsletter">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
              <h4>Our Newsletter</h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noster
                magna
              </p>
            </div>
            <div class="col-lg-6">
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="container-fluid"
        style={{ backgroundColor: "rgb(224,213,252)" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center text-lg-start text-muted">
              <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block ">
                  <span style={{ color: "black", fontWeight: "600" }}>
                    Get connected with us on social networks:
                  </span>
                </div>

                <div>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-youtube" size="large"></ion-icon>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-twitter" size="large"></ion-icon>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-instagram" size="large"></ion-icon>
                  </a>
                  <a href="" className="me-4 text-reset">
                    <ion-icon name="logo-linkedin" size="large"></ion-icon>
                  </a>
                </div>
              </section>

              <section className="">
                <div className="container text-center text-md-start ">
                  <div className="row ">
                    <div
                      className="col-md-3 col-lg-4 col-xl-3 mx-auto"
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">UnFluke</h6>
                      <p>
                        Here you can use rows and columns to organize your
                        footer content. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit.
                      </p>
                    </div>

                    <div
                      className="col-md-2 col-lg-2 col-xl-2 mx-auto "
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Scanner
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Backtest
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Virtual Trading
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Historical Charts
                        </a>
                      </p>
                    </div>

                    <div
                      className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">
                        Useful links
                      </h6>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Pricing
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Settings
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Orders
                        </a>
                      </p>
                      <p>
                        <a
                          href="#!"
                          className="text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Help
                        </a>
                      </p>
                    </div>

                    <div
                      className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
                      style={{ color: "black" }}
                    >
                      <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                      <p>
                        <ion-icon name="location-outline"></ion-icon> New York,
                        NY 10012, US
                      </p>
                      <p>
                        <ion-icon name="mail-outline"></ion-icon>{" "}
                        info@example.com
                      </p>
                      <p>
                        <ion-icon name="call-outline"></ion-icon> + 01 234 567
                        88
                      </p>
                      <p>
                        <ion-icon name="call-outline"></ion-icon> + 01 234 567
                        89
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <div
                className="text-center py-3"
                style={{
                  backgroundColor: "#c585f7",
                  color: "black",
                  opacity: "0.5",
                }}
              >
                © 2021 Copyright:
                <a
                  className="text-reset fw-bold"
                  href="/"
                  style={{ textDecoration: "none" }}
                >
                  unfluke.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
