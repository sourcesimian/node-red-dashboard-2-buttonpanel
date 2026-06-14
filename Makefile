PACKAGE_NAME := @sourcesimian/node-red-dashboard-2-buttonpanel
PACKAGE_TARBALL_NAME := sourcesimian-node-red-dashboard-2-buttonpanel
NODE_RED_DIR ?= _node_red
NPM_CACHE ?= $(CURDIR)/.npm-cache
PACKAGE_VERSION := $(shell node -p "require('./package.json').version" 2>/dev/null)
PACKAGE_TARBALL := $(PACKAGE_TARBALL_NAME)-$(PACKAGE_VERSION).tgz

.PHONY: setup build check check-ci pack-dry-run pack publish-dry-run publish link unlink install-package uninstall-package clean run dev

setup:
	node -v
	npm -v
	npm install
	mkdir -p $(NODE_RED_DIR)
	if [ ! -f $(NODE_RED_DIR)/package.json ]; then cd $(NODE_RED_DIR) && npm init -y; fi
	cd $(NODE_RED_DIR) && npm install node-red @flowfuse/node-red-dashboard
	if [ -f $(NODE_RED_DIR)/settings.js ]; then perl -0pi -e 's|//uiHost: "127.0.0.1",|uiHost: "127.0.0.1",|' $(NODE_RED_DIR)/settings.js; fi

build:
	npm run build

check:
	npm run check

check-ci:
	act \
		--container-architecture linux/amd64 \
		-j check \
		--matrix node-version:22

pack-dry-run: check build
	npm pack --dry-run --cache $(NPM_CACHE)

pack: check build
	npm pack --cache $(NPM_CACHE)

publish-dry-run: check build
	npm publish --dry-run --access public --cache $(NPM_CACHE)

publish: check build
	npm publish --access public --cache $(NPM_CACHE)

link: build
	mkdir -p $(NODE_RED_DIR)/node_modules/@sourcesimian
	cd $(NODE_RED_DIR) && npm install "$(CURDIR)"
	rm -rf $(NODE_RED_DIR)/node_modules/$(PACKAGE_NAME)
	ln -s "$(CURDIR)" "$(NODE_RED_DIR)/node_modules/$(PACKAGE_NAME)"

unlink:
	cd $(NODE_RED_DIR) && npm pkg delete "dependencies.$(PACKAGE_NAME)"
	rm -rf $(NODE_RED_DIR)/node_modules/$(PACKAGE_NAME)

install-package: setup pack
	cd $(NODE_RED_DIR) && npm pkg delete "dependencies.$(PACKAGE_NAME)" || true
	rm -rf $(NODE_RED_DIR)/node_modules/$(PACKAGE_NAME)
	cd $(NODE_RED_DIR) && npm install "$(CURDIR)/$(PACKAGE_TARBALL)"

uninstall-package:
	cd $(NODE_RED_DIR) && npm uninstall $(PACKAGE_NAME) || true
	cd $(NODE_RED_DIR) && npm pkg delete "dependencies.$(PACKAGE_NAME)" || true
	rm -rf $(NODE_RED_DIR)/node_modules/$(PACKAGE_NAME)

clean:
	rm -rf $(NODE_RED_DIR)

run:
	cd $(NODE_RED_DIR) && \
	npx node-red -u .

dev: setup link run
