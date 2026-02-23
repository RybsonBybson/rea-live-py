import asyncio
import websockets
from settings import *

async def handler(websocket: websockets.ServerConnection):
    print("Ktoś się podłączył")

    try:
        async for msg in websocket:
            print("Odebrano:", msg)
            await websocket.send("ok")

    except websockets.ConnectionClosed:
        print("Klient się rozłączył")

async def main():
    async with websockets.serve(handler, "0.0.0.0", PORT):
        print(f"Serwer działa na porcie {PORT}")
        await asyncio.Future()  # działa w nieskończoność

asyncio.run(main())