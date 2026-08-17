FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y \
    g++ \
    cmake \
    git \
    libasio-dev \
    nlohmann-json3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Crow 1.3.3
RUN git clone --depth 1 --branch v1.3.3 https://github.com/CrowCpp/Crow.git /tmp/Crow && \
    cmake -S /tmp/Crow -B /tmp/Crow/build \
        -DCROW_BUILD_EXAMPLES=OFF \
        -DCROW_BUILD_TESTS=OFF && \
    cmake --build /tmp/Crow/build && \
    cmake --install /tmp/Crow/build && \
    rm -rf /tmp/Crow

WORKDIR /app

COPY . .

RUN cmake -S . -B build && \
    cmake --build build

EXPOSE 10000

CMD ["./build/cache_server"]
