import asyncio
import websockets
from settings import *

async def handler(websocket):
    print("Ktoś się podłączył")

    while True:
        msg = await websocket.recv()
        print("Odebrano:", msg)

        reply = input("Ty: ")
        await websocket.send(reply)

async def main():
    async with websockets.serve(handler, "0.0.0.0", PORT):
        print(f"Serwer działa na porcie {PORT}")
        await asyncio.Future()  # działa w nieskończoność

asyncio.run(main())