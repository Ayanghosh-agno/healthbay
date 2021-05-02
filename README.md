## Background
The advent of the 𝐂𝐨𝐯𝐢𝐝-𝟏𝟗 has turned all of our lives upsides down. At present, the traditional emergency response supply chain appears to be breaking since, **Healthcare** facilities are facing catastrophic challenges in providing proper medical treatment. Healthcare has become expensive, visiting hospitals increases exposed contamination since it's time-consuming and often requires creating extensive schedule changes in one's daily routine. Moreover, hospitals don’t have the capacity for a large number of incoming patients. Additionally, treatments often feel inadequate and lack personalization since Doctors are incredibly busy. 

[According to the American Heart Association Research, every 3d person in the world dies because of cardiovascular disease](https://www.heart.org/en/about-us/heart-and-stroke-association-statistics), killing more than **19 million** people per year. There are many people in *rural areas* who can't afford medical treatment. In-home caregivers often act as the bridge between these medical professionals and the patient but this scenario has forced them to stay back at home. Besides, *Community workers are not able to handle real-time monitoring of the overcrowded rural population*. But due to this lack of monitoring & management, many people are dying. 

Keeping light on the same, it's also evident that **elderly’s ability to access usual medical care has drastically decreased**, and the communication with caregivers is impaired. They are more vulnerable to this disease and are little known to modern applications. Demand for remote outpatient solutions has significantly increased which would aid doctors in disease diagnosis and contribute to early detection and timely treatment of illnesses. *But the accessibility gap has disconnected the connected.*

![old-man-heart-attck](https://i.postimg.cc/fWgT11kG/old-man.jpg)

There is a need for a technology platform to **Revolutionize the operation of exisiting Medical System** and that's how our project **Healthbay** jumps in! 

![healthbay-logo-main.png](https://i.postimg.cc/7Z46N05h/healthbay-logo-main.png)

## What is Healthbay?
**Healthbay** is the concatenation of Health and Bay which together stands as the **Gateway of  Healthcare System**. Our software is a web application that utilizes cutting-edge modern technologies to *Revolutionize the existing Healthcare system*! *Healthbay* is a complete healthcare system for everyone, including Patients, Doctors & is directly connected with Healthcare centres/Hospitals with integrated SOS feature supported by Proximity-mapping, specially designed for elderlies to initiate checkups with real-time remote monitoring without needing to visit a doctor. Please follow through to explore! 

Our app is distinguishably sectioned for different operations. *Healthbay*'s packed with various features and comes along with it's child **H-Clip** which is a seperate device helping in tracking Pulses/per-minute and SPO2 levels, everything at real-time from which we later extract the Blood Pressure levels using our custom made models.

Although we could have proceeded for a contact-less method using camera feed, but upon carrying out extensive research, we decided to choose a physical device not just because they are more accurate and effective, but because, it will provide a lot more mobility! Moreover, excluding the same helps in ensuring 100% GDPR compatability offering seamless **user privacy**!

A further explanation of how each of these works can be found in the Engineering section below.

#### Breakdown

1. **Get onboard on Healthbay**
2. **Add your personal details**
3. **Explore the dashboard and try out it's features**
4. **Initiate Chat/VC between verified and regiestered Doctors and Users**
5. **Live Tracking of health data**
6. **Emergency response SOS**
7. **Live Ambulance Tracking**

![entities-x.jpg](https://i.postimg.cc/pXxdzWDQ/entities-x.jpg)

### Features 
Healthbay currently supports all of the following features!

> 1. Minimalistic Material-UI inspired UX with a mobile-first approach.
> 2. It's a React **PWA**, hence has support for both desktop & mobile devices.
> 3. Dynamic Onboarding for User/Patient, Doctors, Hopitals & Ambulance.
> 4. Distinguishable dashboards for all of the above.
> 5. Dynamic Verification of legal documents via Authorization Body.
> 6. Medical History (Report + Prescription docs) Vault backed by **Blockchain**
> 7. End-to-End encypted P2P chat with notification & prescribing featues.
> 8. Instant SOS feature.
> 9. Proximity mapping for Ambulances with respect to Users.
> 10. Dynamic synchronization of Hospital Beds & Ambulances.
> 11. Real-time Location Visualization of Patients, Doctors, Hospitals & Ambulances.
> 12. Disease Prediction from symptoms.
> 13. COVID-19 FAQ's
> 14. Device synchronized Content Translation (Device dependant & not via i18n).
> 15. Real-time Health Monitoring (Powered by *H-Clip*) via Photoplethysmography (PPG)
    - Pulse rate detection (HB/per-min) 
    - Oxygen Saturation level detection (SPO2)
    - Blood Pressure detection
    - Fall Detection (via HDx-2 vibration sensor)
    
Delve deep to explore more! 

---
## Design

We were heavily inspired by the revised version of **Double Diamond** design process developed by **UK Research Council**, which not only includes visual design, but a full-fledged research cycle in which you must discover and define your problem before tackling your solution.

![Double-Diamond](https://i.postimg.cc/bJhq9jCn/Double-diamond.png)

> 1. **Discover**: a deep dive into the problem we are trying to solve.
> 2. **Define**: synthesizing the information from the discovery phase into a problem definition.
> 3. **Develop**: think up solutions to the problem.
> 4. **Deliver**: pick the best solution and build that.

We utilized design tools like [**Figma**](https://www.figma.com/file/p8VXBK0JBCo2jRClIqXoQi/Health-Bay) & Photoshop to protoype our designs and design palette before doing any coding. Through this, we are able to get iterative feedback so that we spend less time re-writing code.

![figma-prototype](https://i.postimg.cc/Qtwky07c/figma-prototype.png)

![design-scheme2](https://i.postimg.cc/CxxBbbB0/design-scheme2.png)

---

# Engineering
### System Architecture
![sys-arch](https://i.postimg.cc/BnM4xJMy/sys-arch.png)

**So, how everything works?**

### Backend
Our backend is built in Flask and Node.js(used for multithread application), connected to a SQLite Database. Moreover, all of the ML processings are being performed on AI platform which comes along with GCP. The central server connects with the NodeMCU via MQTT which is primarily attached with two other sensors, MAX30100 and HDx-2 which helps in monitoring Pulse beats and SPO2 levels respectively along with vibration, in case if sudden-fall is triggered. We use a pretrained and an another custom made model, which we run on the AI platform to analyse health diseases (datasets mentioned below). Medical records are stored in the GCS bucket where we keep a worker to intiate an action while we store the records on the Blockchain which can be accessed via [here](https://www.api.healthbay.us/blockchain). The database connection is established with SQLite and an NGINX reverse proxy is set up for load balancing. All of the responses and requests are routed via REST.

For the Blockchain part, 
![blockchain](https://i.postimg.cc/q7WcQhLZ/blockchain-uo.jpg)

• **Data Analysis** : For rapid flow, we took the help of three kaggle notebooks as mentioned below.
- Heart Disease Classifications (@cdabakoglu Kaggle) : https://bit.ly/3eQNEH1
- Predicting heart disease using machine learning (@faressayah Kaggle) : https://bit.ly/3xHxKaj
- Heart Fail:Analysis and Quick-prediction (@nayansakhiya Kaggle) : https://bit.ly/3tdPd6Z

### Frontend
**Healthbay** is crafted with ❤️. The front-end of the application is made with React.js and Tailwind CSS as the CSS library. Besides, the landing page was developed with Gatsby. The authentication of the platform is done via Firebase. We tried our level best to make the UI/UX intuitive as well as attractive. Moreover, we used Leaflet.js for the visualization of live tracking of ambulances. The application is deployed on a free tier of Netlify. 

![tech-stack.jpg](https://i.postimg.cc/MXJKrtQF/tech-stack.jpg)

---
## Research

-  *AI-based smart prediction of clinical disease using random forest classifier and Naive Bayes*, Springer Nov. 04, 2020 (page 4 - 7) : https://link.springer.com/article/10.1007/s11227-020-03481-x

- *Intelligent heart disease prediction system using random forest and evolutionary approach*, Researchgate Jan. 2016 : https://bit.ly/3xOJEj5

-  *Design and Development of Real-Time Heart Disease Prediction System for Elderly People Using Machine Learning*, Researchgate Aug. 2019 : https://bit.ly/2QLvcr6

-  *Design of Mobile Healthcare Monitoring System Using IoT Technology and Cloud Computing*, IOP Conference Series, 2020 : https://bit.ly/3e9aPgs

-  *Advanced artificial intelligence in heart rate and blood pressure monitoring for stress management*, Researchgate Mar. 2021 (page 3 - 4) : https://bit.ly/3eaGQVz

➤ **Datasets** :-
-  MIMIC II Dataset
-  UCI Heart Disease Dataset : https://bit.ly/3e9ekU8
-  Heart Attack Analysis & Prediction Dataset : https://bit.ly/3gQ8clA

➤ **Articles** :- 
- Why Hospitals are hotbeds of coronavirus transmission : https://bit.ly/3gW6C1I
- Entire families in hospital after coronavirus surge : https://bbc.in/3ubbB2g
- People died waiting for treatment after hospitals were cleared for COVID-19 : https://bit.ly/3e7Aw10

#### Credits
- 𝐃𝐞𝐬𝐢𝐠𝐧 𝐑𝐞𝐬𝐨𝐮𝐫𝐜𝐞𝐬: Dribble, Behance, Freepik
- 𝐈𝐜𝐨𝐧𝐬: Material Icons, Icons8, Flaticons

---
## Takeaways 

### What we learned
A lot of things, both summed up in technical & non-technical sides. Also not to mention, we enhanced our googling and Stackoverflow searching skill during the hackathon :)

### Accomplishments
We explored so many things within 48 hours. It was a tad difficult for us to collaborate in a virtual setting but we are proud of finishing the project on time which seemed like a tough task initially but happily were also able to add most of the concepts that we envisioned for the app during ideation. Lastly, we think the impact our project could have is a significant accomplishment. Especially, trailing the current scenario of COVID19, this could really be a product that people find useful!

This project was especially an achievement for us because this time the experience was very different than what we have while building typical hackathon projects, which also includes heavy brainstorming, extensive research, and yes, hitting the final pin on the board.

![team](https://i.postimg.cc/Mp3DB6Gs/teamx.png)

### What's next for Healthbay
As previously mentioned, *Healthbay* is one of the **most technically sound** projects we have made till now, and we would love to keep it open-sourced indefinitely so that anyone can contribute to the project since we are aiming to expand the wings of our project beyond the hackathon. Apart from fine-tuning the project, we're also planning to integrate new user-intuitive features such as refined User/Patient access, easy checkout option for hospitals, adding more such IoT-based inter-device support for maximizing our audience interaction. Apart from these, a lot of code needs to be refactored which does include CSS improvements for desktop preview as we couldn't hit so much under 48 hrs. Overall, we hope that one day this project can be widely used among the medical community to redefine the existing & remove the backlogs.
