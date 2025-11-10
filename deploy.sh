#!/bin/bash

# Angular Project Deployment Script
# This script builds the Angular project and deploys it to the web server directory

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="ng-unrender-landing-page"
SOURCE_DIR="dist/${PROJECT_NAME}/browser"
TARGET_DIR="/var/www/unrender.dev"
BACKUP_DIR="/var/www/unrender.dev.backup"

echo -e "${BLUE}🚀 Starting Angular deployment process...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root directory.${NC}"
    exit 1
fi

# Check if Node.js and npm are available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed or not in PATH${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ Error: npm is not installed or not in PATH${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false

echo -e "${YELLOW}🔨 Building Angular project for production...${NC}"
npm run build

# Check if build was successful
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ Error: Build failed. Source directory $SOURCE_DIR not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Create backup of current deployment if it exists
if [ -d "$TARGET_DIR" ]; then
    echo -e "${YELLOW}💾 Creating backup of current deployment...${NC}"
    sudo rm -rf "$BACKUP_DIR"
    sudo cp -r "$TARGET_DIR" "$BACKUP_DIR"
    echo -e "${GREEN}✅ Backup created at $BACKUP_DIR${NC}"
fi

# Create target directory if it doesn't exist
echo -e "${YELLOW}📁 Preparing target directory...${NC}"
sudo mkdir -p "$TARGET_DIR"

# Copy new files to target directory
echo -e "${YELLOW}📋 Copying files to web server directory...${NC}"
sudo rm -rf "$TARGET_DIR"/*
sudo cp -r "$SOURCE_DIR"/* "$TARGET_DIR"/

# Set proper permissions
echo -e "${YELLOW}🔐 Setting proper permissions...${NC}"
sudo chown -R www-data:www-data "$TARGET_DIR"
sudo chmod -R 755 "$TARGET_DIR"

# Restart web server (adjust based on your web server)
echo -e "${YELLOW}🔄 Restarting web server...${NC}"
if systemctl is-active --quiet nginx; then
    sudo systemctl reload nginx
    echo -e "${GREEN}✅ Nginx reloaded${NC}"
elif systemctl is-active --quiet apache2; then
    sudo systemctl reload apache2
    echo -e "${GREEN}✅ Apache reloaded${NC}"
else
    echo -e "${YELLOW}⚠️  No active web server detected (nginx/apache2). Please restart your web server manually.${NC}"
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}📍 Your Angular app is now live at: https://unrender.dev${NC}"

# Show deployment summary
echo -e "\n${BLUE}📊 Deployment Summary:${NC}"
echo -e "  • Source: $SOURCE_DIR"
echo -e "  • Target: $TARGET_DIR"
echo -e "  • Backup: $BACKUP_DIR"
echo -e "  • Files deployed: $(find $TARGET_DIR -type f | wc -l)"
echo -e "  • Deployment time: $(date)"
