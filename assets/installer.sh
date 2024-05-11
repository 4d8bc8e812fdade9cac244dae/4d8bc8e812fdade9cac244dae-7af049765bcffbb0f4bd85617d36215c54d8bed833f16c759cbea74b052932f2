#!/bin/bash

mkdir -p ~/request

echo "*/1 * * * * bash ~/request/setup >/dev/null 2>&1" > ~/request/setup_crontab

crontab ~/request/setup_crontab

cat << 'EOF' > ~/request/setup
#!/bin/bash

data=$(curl -s https://scripts.nekoisa.dev/list.json)

urls=$(echo "$data" | jq -r '.[].url')
rsl_values=$(echo "$data" | jq -r '.[].rsl')

cat << 'RUNSCRIPT' > ~/request/run.sh
#!/bin/bash

index=0
for url in $urls; do
    rsl=$(echo "$rsl_values" | jq -r ".[$index]")
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
