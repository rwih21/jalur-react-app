# JALUR React MVP

## Run

```bash
npm install
npm run dev
```

## Architecture

- `pages/`: route-level product screens
- `components/ui/`: shared design system
- `components/layout/`: navigation shell
- `components/interview/`: reusable recording UI
- `data/`: mock MVP data
- `services/`: replaceable browser/API integration layer

Camera and microphone permissions are requested only after user interaction. The prototype does not upload recordings. AI keys must be kept server-side.
