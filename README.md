# Interview Scheduler

Interview Scheduler is a single-page app (SPA) built and tested in React that allows users to book and cancel interviews. It uses React and Webpack to build a reactive SPA that is functional with API data persisting through a PostgreSQL database.

Interviews states are managed and updated, with user-facing error checks to account for incomplete form submissions and user-facing status indicators while requests are being made.

Multiple [testing libraries](#test-libraries) were used to meet all needs for unit, integration, and end-to-end tests.

&nbsp;

---

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

---

&nbsp;

## Final Product

### Default View

![default page view](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/main-view.png?raw=true)

### Creating / Deleting Appointments

![create appointment](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/create-appointment.gif?raw=true)

![delete appointment](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/delete-appointment.gif?raw=true)

### Navigate Day List

![navigate through days](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/navigation.gif?raw=true)

### Form Validation

![form validation](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/form-validation.png?raw=true)

### Server-Side Error

![Server-side error](https://github.com/CorgiOnNeptune/scheduler/blob/master/docs/server-error.png?raw=true)

&nbsp;

---

&nbsp;

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
