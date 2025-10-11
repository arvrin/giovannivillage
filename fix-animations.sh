#!/bin/bash
# Quick fix: Remove initial animations to make content visible
# Replace initial+whileInView with just animate

find components/sections -name "*.tsx" -type f -exec sed -i '' \
  -e 's/initial={{ opacity: 0.*whileInView={{ opacity: 1/animate={{ opacity: 1/g' \
  -e 's/viewport={{ once: true.*}}//g' \
  {} \;

echo "Fixed animation properties in section components"
