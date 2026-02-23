import asyncio
import websockets

async def handler(websocket):
    print("Ktoś się podłączył")

    while True:
        msg = await websocket.recv()
        print("Odebrano:", msg)

        reply = input("Ty: ")
        await websocket.send(reply)

async def main():
    async with websockets.serve(handler, "0.0.0.0", 8765):
        print("Serwer działa na porcie 8765")
        await asyncio.Future()  # działa w nieskończoność

asyncio.run(main())