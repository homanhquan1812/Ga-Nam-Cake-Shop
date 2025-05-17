import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/Footer";
import Head from "../component/Head";
import { Header } from "../component/Header";
import Script from "../component/Script";
import { StoreContext } from "../store/Store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ModelFormReservation } from "../component/ModelFormReservation";
const formControlStyle = {
  display: "block",
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: 1.5,
  color: "#212529",
  backgroundColor: "#fff",
  backgroundClip: "padding-box",
  border: "1px solid #ced4da",
  borderRadius: "0.375rem",
  transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
};

const schemaFeedback = z.object({
  branch_id: z.string().trim().min(1, "Please select a branch"),
  type: z.string().trim().min(1, "Please select feedback type"),
  content: z
    .string()
    .trim()
    .min(1, "Please enter content")
    .max(500, "Content must not exceed 500 characters"),
});

const Contact = () => {
  const [listBranch, setListBranch] = useState([]);
  const { state } = useContext(StoreContext);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaFeedback),
    defaultValues: {
      branch_id: "",
      type: "",
      content: "",
    },
  });

  const getListBranch = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_WEB_SERVICE}/branch`
      );
      setListBranch(data.branch || []);
    } catch (err) {
      console.error("Failed to fetch branch list:", err);
    }
  };

  const onSubmit = async (data) => {
    if (!state.user) {
      alert("Please login before submitting");
      navigateTo("/login");
    } else
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_WEB_SERVICE}/feedback`,
          { ...data, customer_id: state.user?.id }
        );

        if (response.status === 201) {
          alert("Feedback sent, thank you!");
          navigateTo("/home");
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert(
          "An error occurred while submitting feedback. Please try again later."
        );
      }
  };

  useEffect(() => {
    getListBranch();
  }, []);

  return (
    <div>
      <Head
        additionalStylesheets={[
          "/css/lightbox.min.css",
          "/css/owl.carousel.min.css",
          "/css/owl.theme.default.min.css",
          "/css/main.css",
          "/css/linea-icon.css",
        ]}
        additionalTitle={["Contact - Gà Nấm Cake Shop"]}
      />
      <Header />
      <section className="contact" id="contact">
        <h2>FEEDBACK</h2>
        <div className="contact__form container">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12 gy-2">
              <label>Branch</label>
              <Controller
                name="branch_id"
                control={control}
                render={({ field }) => (
                  <select style={formControlStyle} {...field}>
                    <option value="" disabled>
                      Select a branch
                    </option>
                    {listBranch.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.address}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.branch_id && (
                <p className="text-danger">{errors.branch_id.message}</p>
              )}
            </div>

            <div className="col-12 gy-2">
              <label>Feedback Type</label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <select style={formControlStyle} {...field}>
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Complaint">Complaint</option>
                  </select>
                )}
              />
              {errors.type && (
                <p className="text-danger">{errors.type.message}</p>
              )}
            </div>

            <div className="col-12 gy-2">
              <label>Content</label>
              <textarea
                className="form-control"
                rows={6}
                placeholder="Enter feedback content"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-danger">{errors.content.message}</p>
              )}
            </div>

            <div className="col-12 gy-2">
              <button className="btn btn-primary rounded" type="submit">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
        <div className="contact__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.397043949722!2d106.61869841167713!3d10.780871689323831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c1b113b9605%3A0x5241b1bb53abb66c!2zMjEzIEzDqiBDYW8gTMOjbmcsIFBow7ogVGjhuqFuaCwgVMOibiBQaMO6LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1688815979375!5m2!1sen!2s"
            width="100%"
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="contact__info container">
          <div className="row">
            <div className="contact__item col-4">
              <i className="fa fa-home" />
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="contact__item col-4">
              <i className="fa fa-phone" />
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="contact__item col-4">
              <i className="fa fa-envelope-open" />
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </section>
      {/* POLICY */}
      <section className="policy">
        <h1>POLICY</h1>
        <div className="policy__text1">
          <h2>PURPOSE AND SCOPE OF CUSTOMER INFORMATION COLLECTION</h2>
          <p>
            Purpose of collection: GaNam only collects customer information for
            the purpose of receiving, responding to comments and answering
            customer questions related to ABC Bakery's products and services,
            and understanding customer information, customers' wishes and
            desires to improve product and service quality, ensuring full
            benefits for customers.
          </p>
          <p>
            Scope of collection: During the process of receiving, responding to
            comments and answering questions for customers, abcbakery.co only
            collects information provided by customers including: contact name,
            email, contact content.
          </p>
        </div>
        <div className="policy__text2">
          <h2>SCOPE OF INFORMATION USE:</h2>
          <p>
            Website abcbakery.co only uses customer information to provide
            feedback and answer customer questions about ABC bakery's products
            and services.
          </p>
          <p>
            ABC Bakery does not use, transfer, provide or disclose to third
            parties users' personal information without prior consent.
          </p>
          <p>
            In case there is a request from a competent state agency related to
            a violation, abcbakery.co is responsible for cooperating in
            providing customer personal information.
          </p>
        </div>
        <div className="policy__text3">
          <h2>INFORMATION STORAGE PERIOD</h2>
          <p>
            Personal information provided by customers will be kept confidential
            on abcbakery.co's server until cancellation is requested by the
            customer via email contact@abcbakery.co or via customer care
            (028)38520857- ext: 1604
          </p>
        </div>
        <div className="policy__text4">
          <h2>
            PEOPLE OR ORGANIZATIONS WHO MAY HAVE ACCESS TO CUSTOMER INFORMATION:
          </h2>
          <p>
            Consumers agree that, in case of necessity, the following
            agencies/organizations/individuals have the right to access and
            collect their personal information, including:
          </p>
          <p> Board</p>
          <p> At the request of a competent state agency</p>
        </div>
        <div className="policy__text5">
          <h2>
            ADDRESS OF THE INFORMATION COLLECTION AND MANAGEMENT UNIT, including
            contact methods so consumers can inquire about the collection and
            processing of personal information related to them:
          </h2>
          <p>
            Address of the unit that collects and manages personal information
          </p>
          <p> Asia Confectionery One Member Company Limited</p>
          <p>
            {" "}
            Office address: 1175A, 3/2 Street, Ward 6, District 11, City. Ho Chi
            Minh, Vietnam
          </p>
        </div>
        <div className="policy__text6">
          <h2>
            Contact method for customers to ask about the collection and
            processing of personal information related to them
          </h2>
          <p>Contact customer service (028)38520857- ext: 1604</p>
          <p> Via email: contact@abcbakery.co</p>
        </div>
        <div className="policy__text6">
          <h2>MEANS AND TOOLS FOR USERS TO ACCESS AND EDIT PERSONAL DATA:</h2>
          <p>
            The website does not allow online transactions and has no online
            transaction function. Therefore, the website abcbakery.co does not
            require users to register/log in to an account. We only store
            customer information including name, contact email and the content
            the customer wants to communicate. In addition, the website does not
            require customers to provide any other information. The person
            contacting abcbakery.co will be solely responsible for the accuracy
            of the information they provide. When there is a need to access and
            edit personal information, users can contact via ABC Bakery's
            information shown on the website in the "Contact" section. Users
            cannot check, update, adjust or cancel personal information
            themselves
          </p>
        </div>
        <h2>
          Mechanism to receive and resolve consumer complaints related to
          personal information being used for the wrong purpose or scope as
          notified.
        </h2>
        <div className="policy__text7">
          <p>
            Users' personal information on abcbakery.co is committed to absolute
            confidentiality according to abcbakery.co's personal information
            protection policy.
          </p>
          <p>
            The collection and use of each user's information is only carried
            out with that customer's consent, unless otherwise prescribed by
            law.
          </p>
          <p>
            In the event that the information server is attacked by hackers
            resulting in the loss of member personal data, ABC Bakery will be
            responsible for reporting the incident to the investigating
            authorities for timely handling and notification to users. known
            use.
          </p>
          <p>
            Users are responsible for promptly notifying the abcbakery.co
            website of any illegal use or misuse of information to take
            appropriate measures.
          </p>
          <p>
            We commit to all sharing and use of customer information in
            accordance with the company's privacy policy and the provisions of
            Vietnamese Law. ABC Bakery is committed to making you feel confident
            and satisfied about the security of personal information when
            cooperating with the company.
          </p>
        </div>
      </section>

      <Footer />
      <Script />
      <a href="#" className="backtotop cd-top text-replace js-cd-top">
        <i className="fa fa-angle-up" />
      </a>
    </div>
  );
};

export default Contact;
