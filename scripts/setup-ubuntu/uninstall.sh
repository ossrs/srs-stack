#!/bin/bash

# Execute by: bash xxx.sh or bash zzz/yyy/xxx.sh or ./xxx.sh or ./zzz/yyy/xxx.sh source xxx.sh
REALPATH=$(realpath ${BASH_SOURCE[0]})
SCRIPT_DIR=$(cd $(dirname ${REALPATH}) && pwd)
WORK_DIR=$(cd $(dirname ${REALPATH})/../.. && pwd)
echo "BASH_SOURCE=${BASH_SOURCE}, REALPATH=${REALPATH}, SCRIPT_DIR=${SCRIPT_DIR}, WORK_DIR=${WORK_DIR}"
cd ${WORK_DIR}

if [[ -f /etc/init.d/srs_stack ]]; then
    /etc/init.d/srs_stack stop
    echo "Stop srs-stack service ok"
fi

INIT_D=/etc/init.d/srs_stack &&
rm -f $INIT_D
echo "Remove init.d script $INIT_D ok"

if [[ -f /usr/lib/systemd/system/srs-stack.service ]]; then
    systemctl disable srs-stack
    rm -f /usr/lib/systemd/system/srs-stack.service
    systemctl daemon-reload
    systemctl reset-failed
    echo "Remove srs-stack.service ok"
fi

INSTALL_HOME=/usr/local/srs-stack
rm -rf $INSTALL_HOME
echo "Remove install $INSTALL_HOME ok"

rm -f ~/credentials.txt
echo "Remove credentials.txt"

