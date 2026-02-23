import asyncio
import websockets
from settings import *

async def chat():
    uri = f"ws://192.168.1.7:{PORT}"  # <-- tu IP serwera

    async with websockets.connect(uri) as websocket:
        print("Połączono z serwerem")

        while True:
            msg = input("Ty: ")
            await websocket.send(msg)

            reply = await websocket.recv()
            print("Odpowiedź:", reply)

asyncio.run(chat())