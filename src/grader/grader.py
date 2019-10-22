import sys
import os

def extractFlags(argv: str):
    def extractFlag(flag: str):
        return flag.strip().lstrip('-').split('=')

    flags = list(map(extractFlag, argv))
    return dict(flags)

flags = extractFlags(sys.argv[1:])

# Check if all required flags are presented
if 'lang' not in flags:
    print('Usage: python3 grader.py -lang=<c|cpp> [-tl=<time limit> -ml=<memory limit>]')
else:
    cmd = ' '.join(['./start.sh',
                    flags['lang'],
                    flags['tl'] if 'tl' in flags else '1',
                    flags['ml'] if 'ml' in flags else '512'
                ])
    os.system(cmd)