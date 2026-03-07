# Sono

A multi-functional audio chat application featuring a web interface, backend server, and a dedicated TURN server for WebRTC.

## Project Structure

- `web/` — Frontend built with React + Vite
- `server/` — Main backend (Node.js)
- `turn-server/` — TURN/STUN server for WebRTC connectivity

## Quick Start

### 1. Install Dependencies

```bash
npm install --prefix web
npm install --prefix server
npm install --prefix turn-server
```

### 2. Environment Variables

#### web/.env.example

```env
VITE_BACKEND_API=your_backend_api_url
VITE_TURN_SERVER_URL=turn:your.turn.server:port
VITE_TURN_SERVER_USERNAME=your_turn_username
VITE_TURN_SERVER_CREDENTIAL=your_turn_password
```

#### turn-server/.env.example

```env
TURN_SERVER_USERNAME=your_turn_username
TURN_SERVER_CREDENTIAL=your_turn_password
```

### 3. Running the Application

#### Frontend

```bash
cd web
npm run dev
```

#### Backend

```bash
cd server
npm run dev
```

#### TURN Server

```bash
cd turn-server
npm run dev
```

## Key Directories

- `web/src/` — Frontend source code
- `web/src/components/` — UI components
- `web/src/hooks/` — Custom React hooks
- `web/src/pages/` — Application pages
- `server/app.ts` — Main backend entry point
- `turn-server/app.ts` — TURN server logic

## Notes

- WebRTC requires a properly configured TURN/STUN server for cross-network connectivity.
- All `.env` files are included in `.gitignore` and should not be committed to the repository.
