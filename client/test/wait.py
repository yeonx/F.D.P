import threading
import socket
import tkinter as tk  # Tkinter
from PIL import ImageTk, Image  # Pillow
import cv2
import pickle, struct, imutils
import PIL.Image, PIL.ImageTk
import os
import pytesseract
import winsound as sd
import time

from datetime import datetime


host_ip = '172.30.1.11'
port = 9001

name = '학번_이름'

chatting_board = None
book_state = 1

def beepsound(): # 비프음 재생q
    fr = 2000    # range : 37 ~ 32767
    du = 1000     # 1000 ms == 1second
    sd.Beep(fr, du) # winsound.Beep(frequency, duration)

def imwrite(filename, img, params=None): # 한글 이름으로 파일 저장하기 위함
    try:
        ext = os.path.splitext(filename)[1]
        result, n = cv2.imencode(ext, img, params)

        if result:
            with open(filename, mode='w+b') as f:
                n.tofile(f)
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False

class tkCamera(tk.Frame):

    def __init__(self, window, video_source=0):
        super().__init__(window)

        self.window = window

        # self.window.title(window_title)
        self.video_source = video_source
        self.vid = MyVideoCapture(self.video_source)

        self.canvas = tk.Canvas(window, width=self.vid.width, height=self.vid.height)
        #self.canvas.pack()
        self.canvas.place(x=30, y=30)

        # After it is called once, the update method will be automatically called every delay milliseconds

        self.delay = 15
        self.update_widget()

    def update_widget(self):
        self.flag = 0
        # Get a frame from the video source
        ret, frame = self.vid.get_frame()

        if ret:
            pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
            check_stuName = 0  # 이름 일치 여부
            check_stuNum = 0  # 학번 일치 여부

            stuName = '이연희'  # 정답 이름
            stuNum = '19011824'  # 정답 학번

            admission = 0  # 학생증 인증 여부

            text = pytesseract.image_to_string(frame, lang='kor')  # img 에서 text 인식
            text = text.replace(" ", "")  # 띄어쓰기 제거
            cv2.rectangle(frame, (round(640 * 0.1), round(480 * 0.1)), (round(640 * 0.9), round(480 * 0.9)),
                          (255, 0, 0), 4)
            if (stuName in text): check_stuName = 1  # 이름 인식
            if (stuNum in text): check_stuNum = 1  # 학번 인식
            if (check_stuName == 1 and check_stuNum == 1):  # 이름, 학번 모두 인식 완료
                cv2.rectangle(frame, (round(640 * 0.1), round(480 * 0.1)), (round(640 * 0.9), round(480 * 0.9)),
                          (0, 255, 0), 4)  # 초록 테두리
                imwrite('StudentIDCard/' + stuNum + '_' + stuName + '.jpg', frame)  # 신분증 이미지 저장
                beepsound()  # 비프음
                cv2.waitKey(2000)
                self.flag=1

            self.image = PIL.Image.fromarray(frame)
            self.photo = PIL.ImageTk.PhotoImage(image=self.image)
            self.canvas.create_image(0, 0, image=self.photo, anchor=tk.NW)

        if self.flag==0:
            self.window.after(self.delay, self.update_widget)
        else:
            # self.vid.release()
            cv2.destroyAllWindows()

class App:

    def __init__(self, window, window_title, video_source1=0):
        self.window = window

        self.window.title(window_title)
        # open video source (by default this will try to open the computer webcam)
        self.vid1 = tkCamera(window, video_source1)
        self.vid1.pack()
        # Create a canvas that can fit the above video source size
        #self.window.mainloop()

class MyVideoCapture:
    def __init__(self, video_source=0):
        # Open the video source
        self.vid = cv2.VideoCapture(video_source)
        if not self.vid.isOpened():
            raise ValueError("Unable to open video source", video_source)
        # Get video source width and height
        self.width = self.vid.get(cv2.CAP_PROP_FRAME_WIDTH)
        self.height = self.vid.get(cv2.CAP_PROP_FRAME_HEIGHT)

        self.width = 640
        self.height = 480

    def get_frame(self):
        if self.vid.isOpened():
            ret, frame = self.vid.read()
            if ret:
                frame = cv2.resize(frame, (640, 480))
                # Return a boolean success flag and the current frame converted to BGR
                return (ret, cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            else:
                return (ret, None)

win = tk.Tk()  # 인스턴스 생성

win.geometry("700x600")
win.option_add("*Font", "Arial 20 bold italic")
App(win, "대기실 GUI", 0)

# room 라벨
lab1 = tk.Label(win)
lab1.config(text="ROOM NO.")
lab1.place(x=70, y=540)
# lab1.pack()
# room 입력창
ent1 = tk.Entry(win)
ent1.place(x=240, y=540)

def enter_room():
    ent1_get=ent1.get()
    print(ent1_get)

class Test_start():
    def __init__(self):
        self.btn1 = tk.Button(win,text="입장",command=win.destroy)

        self.btn1.config(width=6)
        self.btn1.place(x=565, y=525)
    def nextpage(self):
        self.btn1.config(text="입장!")

test_start = Test_start()

win.mainloop()  # GUI 시작