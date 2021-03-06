import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Row, Col, Menu, Button, Icon } from 'antd';
import { Link } from '../../../routes';
import './header.less';

const { Item: MenuItem } = Menu;

export default class Header extends Component {

  static propTypes = {
    router: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.changeLang = this.changeLang.bind(this);
    this.goToNext = this.goToNext.bind(this);
  }

  changeLang() {
    const { router, lang } = this.props;
    const { asPath } = router;
    switch (lang) {
      case 'enUS':
        switch (asPath) {
          case '/':
            return Router.push(`${asPath}zhCN`);
          default:
            return Router.push(`${asPath}/zhCN`);
        }
      default:
        switch (asPath) {
          case '/zhCN':
            return Router.push(asPath.replace('/zhCN', '/'));
          default:
            return Router.push(asPath.replace('/zhCN', ''));
        }
    }
  }

  goToNext(item) {
    const { lang } = this.props;
    const { key } = item;
    switch (lang) {
      case 'enUS':
        return Router.push(key);
      default:
        return Router.push(`${key}/zhCN`);
    }
  }

  render() {
    const { router, lang } = this.props;
    const { asPath } = router;

    return (
      <Row className="header-el">
        <Col span={4}>
          <Link route='/'>
            <a>
              <img src="/static/icon-long.png" alt="" />
            </a>
          </Link>
        </Col>
        <Col span={3} className="header-el-border-col">
          <div className="header-el-border" />
        </Col>
        <Col span={12} className="header-el-col-right">
          <Menu
            mode="horizontal"
            selectedKeys={[asPath]}
            onClick={this.goToNext}
            className="header-el-menu"
          >
            <MenuItem
              key="/example"
              className="header-el-menu-item"
            >
              { lang === 'enUS' ? 'Trial now' : '立刻试用' }
            </MenuItem>
            <MenuItem
              key="/docs"
              className="header-el-menu-item"
            >
              { lang === 'enUS' ? 'Document' : '使用文档' }
            </MenuItem>
          </Menu>
        </Col>
        <Col span={3} className="header-el-col-right">
          <Button
            size="small"
            onClick={this.changeLang}
          >
            { lang === 'enUS' ? '简体中文' : 'English' }
          </Button>
        </Col>
        <Col span={2} className="header-el-col-right">
          <a
            href="https://github.com/mzonghao/antd-tablex"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon type="github" style={{ fontSize: '20px' }} />
          </a>
        </Col>
      </Row>
    );
  }
}
