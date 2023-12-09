# 

ffmpeg \
  -f pulse \
  -i default \
  -f video4linux2 \
  -thread_queue_size 64 \
  -framerate 25 \
  -video_size 640x480 \
  -i /dev/video0 \
  -pix_fmt yuv420p \
  -bsf:v h264_mp4toannexb \
  -profile:v baseline \
  -level:v 3.2 \
  -c:v libx264 \
  -x264-params keyint=120:scenecut=0 \
  -c:a aac \
  -b:a 128k \
  -ar 44100 \
  -f rtsp \
  -muxdelay 0.1 rtsp://localhost:8554/live/paul

ffmpeg -re -stream_loop -1 -i .20231029191214.mp3 -f rtsp -rtsp_transport tcp rtsp://localhost:554/live.stream
