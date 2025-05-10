# Neighborhooder

An interactive map quiz game to help you develop an intuitive mental map of metro areas like San Francisco, Dallas, Nashville, Phoenix, and Seattle.

## 🗺 Features

- Click-to-guess map game powered by Leaflet
- Region dropdown for plug-and-play cities
- Hard Mode: removes place labels for a real challenge
- Score tracking with linear distance-based scoring
- Fully static frontend built with Vite, React, and TypeScript

## 🚀 Deployment

To deploy the app to the live server:

```bash
pnpm ship
```

This runs the production deploy script on your EC2 box.

## 🏗 Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Leaflet](https://leafletjs.com/)
- TypeScript
- Hosted on EC2 with Nginx + Certbot for HTTPS

## 📂 Folder Structure

- `src/components`: React components (Map, Markers, Controls, etc.)
- `public/places/`: Region data files (JSON)
- `deploy-neighborhooder.sh`: CI/CD script on EC2
