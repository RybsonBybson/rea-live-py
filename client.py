import asyncio
import websockets
from settings import *
import easygui

async def chat():
    uri = f"ws://192.168.1.7:{PORT}"  # IP serwera

    async with websockets.connect(uri) as websocket:
        print("Połączono z serwerem")

        for i in range(5):
            file_path = easygui.fileopenbox()
            if file_path:
                await websocket.send(file_path)
                await websocket.recv()  # czekamy na odpowiedź
        
        # tutaj close nie jest konieczne, 'async with' zrobi to automatycznie

asyncio.run(chat())