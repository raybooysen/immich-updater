FROM alpine:3.14

# Install curl
RUN apk --no-cache add curl

# Copy scan.sh script to the container
COPY src/scan.sh /usr/local/bin/scan.sh
RUN chmod +x /usr/local/bin/scan.sh

# Add cron job to run scan.sh every 24 hours
RUN echo "0 0 * * * /usr/local/bin/scan.sh" >> /etc/crontabs/root

# Run scan.sh on startup of the container
CMD ["/usr/local/bin/scan.sh", "&&", "crond", "-f"]
