# Interview Scheduler

Interview Scheduler is a single-page app (SPA) built and tested in React that allows users to book and cancel interviews. It uses React and Webpack to build a reactive SPA that is functional with API data persisting through a PostgreSQL database.

Interviews states are managed and updated, with user-facing error checks to account for incomplete form submissions and user-facing status indicators while requests are being made.

Multiple [testing libraries](#test-libraries) were used to meet all needs for unit, integration, and end-to-end tests.

---

&nbsp;

## Getting Started

1. Install all [dependencies](#dependencies) using the `npm install` command.

### Running Webpack Development Server

2. Run the development web server using the `npm start` command.
3. Go to <http://localhost:8000/> if the browser didn't start automatically.

### Jest Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress E2E Test

```sh
npm run cypress
```

&nbsp;

---

## Final Product

### Default View

![default page view](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/main-view.png?raw=true)

### GIFs of Editing Appointments

<details>
<summary>Creating Appointment</summary>

![create appointment](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/create-appointment.gif?raw=true)

</details>

<details>
<summary>Cancelling Appointment</summary>

![delete appointment](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/delete-appointment.gif?raw=true)

</details>

<details>
<summary>Navigating Day List Sidebar</summary>

![navigate through days](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/navigation.gif?raw=true)

</details>
&nbsp;

### Server-Side Error & Form Validation

<details>
<summary>Server-Side Error</summary>

![Server-side error](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/server-error.png?raw=true)

</details>

<details>
<summary>Form Validation</summary>

![form validation](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/form-validation.png?raw=true)

</details>

&nbsp;

---

## Dependencies

- Node 5.10.x or above
- React
- Webpack, Babel
- Axios
- classNames
- react-test-renderer

## Test Libraries

- Cypress
- Jest
- Storybook
