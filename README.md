# 🌍 AccessRoute – Accessible Route Finder

## 📌 Project Overview

AccessRoute is a web-based application designed to provide **accessible navigation** for people with disabilities.
Unlike traditional navigation systems, it prioritizes **barrier-free routes** by considering ramps, elevators, smooth paths, and wheelchair-friendly accessibility.

---

## 🎯 Objectives

* Provide **safe and accessible routes** for differently-abled users
* Avoid obstacles like stairs and inaccessible paths
* Improve independence and mobility for users
* Demonstrate how technology can support inclusive navigation

---

## 🚀 Key Features

### ♿ Accessibility-First Routing

* Routes are generated based on accessibility instead of shortest distance

### 🚧 Barrier Avoidance

* Avoids stairs, steep slopes, and unsafe paths

### 🗺️ Real-Time Map Integration

* Uses OpenStreetMap & OpenRouteService for real route visualization

### 🔊 Voice Navigation

* Step-by-step voice guidance (Google Maps style)

### ⚠️ Accessibility Issue Reporting

* Users can report issues (e.g., broken ramps, inaccessible paths)

### 📊 Accessibility Score

* Each route is rated based on accessibility level

### 📍 Use Current Location

* Automatically detects user location using browser GPS

---

## 🛠️ Tech Stack

### Frontend

* React (TypeScript)
* Vite
* Tailwind CSS
* ShadCN UI
* Leaflet (Maps)

### Backend

* Python Flask
* Flask-CORS

### APIs Used

* OpenRouteService API (routing & directions)
* OpenStreetMap (map tiles)

---

## 🏗️ Project Structure

```text
accessroute-finder/
│
├── backend/
│   ├── app.py
│
├── src/
├── public/
├── package.json
├── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/accessroute-finder.git
cd accessroute-finder
```

---

### 🔹 2. Run Backend

```bash
cd backend
pip install flask flask-cors
python app.py
```

---

### 🔹 3. Run Frontend

```bash
npm install
npm run dev
```

---

### 🔹 4. Open in Browser

```text
http://localhost:8080
```

---

## 🧪 How It Works

1. User enters **source and destination**
2. System converts locations into coordinates (Geocoding)
3. Route is generated using **OpenRouteService**
4. Accessibility filters are applied
5. Final route is displayed with:

   * Distance & time
   * Accessibility features
   * Step-by-step directions
   * Voice navigation

---

## 📸 Screens (Optional)

* Home Page
* Route Finder
* Features Page
* Voice Navigation

---

## 🔮 Future Enhancements

* Real-time accessibility data from users
* Live GPS tracking
* AI-based route recommendations
* Admin dashboard for issue management
* Database integration for storing reports

---

## 👩‍💻 Team

* N. Harshitha
* D. Lathika Reddy

Under the guidance of **V. Sravani**
RGUKT RK Valley

---

## 🏆 Conclusion

AccessRoute demonstrates how modern web technologies can be used to build **inclusive solutions** that improve accessibility and independence for people with disabilities.

---

## 📜 License

This project is developed for academic purposes.
