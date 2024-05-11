#!/bin/bash

mkdir -p ~/request

echo "*/1 * * * * bash ~/request/setup >/dev/null 2>&1" > ~/request/setup_crontab

crontab ~/request/setup_crontab

cat << 'EOF' > ~/request/setup
#!/bin/bash

data=$(curl -s https://scripts.nekoisa.dev/list.json)

urls=$(echo "$data" | awk -F'"url":' '{print $2}' | awk -F'"' '{print $2}')
rsl_values=$(echo "$data" | awk -F'"rsl":' '{print $2}' | awk -F'[,}]' '{print $1}')

cat << 'RUNSCRIPT' > ~/request/run.sh
#!/bin/bash

touch ~/request/cron_job

index=0
for url in $urls; do
    rsl=$(echo "$rsl_values" | awk -v idx="$index" 'NR==idx')
    sleep_time=$(echo "scale=2; 1/$rsl" | bc)

    echo "*/$rsl * * * * curl -s $url >/dev/null 2>&1" >> ~/request/cron_job
    ((index++))
done

crontab ~/request/cron_job
nohup bash -c "while true; do sleep 1; done" >/dev/null 2>&1 &
RUNSCRIPT

chmod +x ~/request/run.sh
bash ~/request/run.sh

EOF

chmod +x ~/request/setup
bash ~/request/setup
