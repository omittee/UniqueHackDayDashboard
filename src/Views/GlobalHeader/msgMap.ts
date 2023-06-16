import { NoticeIconData } from 'ant-design-pro/lib/NoticeIcon/NoticeIconTab';
import originGenIconImage, { IconType } from '../../lib/genIconImage';
import memoize from 'lodash-es/memoize';
import { SingleMessage } from '../../redux/reducers/msg';

import locales from '../../lib/i18n';
import { replace } from 'connected-react-router';
import { noop } from 'redux-saga/utils';

function fmtString(str: string, ...params: string[]) {
  if (params.length === 0) {
    return str;
  }
  let i = 0;
  while (str.indexOf('%s') >= 0) {
    str = str.replace('%s', params[i++]);
  }
  return str;
}

const genIconImage = memoize(originGenIconImage);

export default function msgMap(msg: SingleMessage): NoticeIconData {
  // created_at是后端返回的一个ISO 8601 格式时间字符串，但前端ts没有定义类型
  const datetime = new Date(msg['created_at']).toLocaleString();
  switch (msg.type) {
    case 'LoginElseWhere':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.ExclamationCircle, 'red'),
        title: locales.messageTitles.LoginElseWhere,
        description: locales.messageValues.LoginElseWhere,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'NewTeammate':
      const data = JSON.parse(msg.data);
      return {
        id: msg.id,
        avatar: genIconImage(IconType.UsergroupAdd, '#FFAF40'),
        title: locales.messageTitles.NewTeammate,
        description: fmtString(locales.messageValues.NewTeammate,data.name, data.username),
        datetime,
        read: msg.read,
        clickHandler: (dispatch: any) => dispatch(replace('/team')),
      } as any;
    case 'TeamCreated':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CheckCircle, 'green'),
        title: locales.messageTitles.TeamCreated,
        description: locales.messageValues.TeamCreated,
        datetime,
        read: msg.read,
        clickHandler: (dispatch: any) => dispatch(replace('/team')),
      } as any;
    case 'TeamJoined':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CheckCircle, 'green'),
        title: locales.messageTitles.TeamJoined,
        description: locales.messageValues.TeamJoined,
        datetime,
        read: msg.read,
        clickHandler: (dispatch: any) => dispatch(replace('/team')),
      } as any;
    case 'ApplyComplete':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CheckCircle, 'green'),
        title: locales.messageTitles.ApplyComplete,
        description: locales.messageValues.ApplyComplete,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'Accepted':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CheckCircle, 'green'),
        title: locales.messageTitles.Accepted,
        description: locales.messageValues.Accepted,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'Rejected':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CloseCircle, 'red'),
        title: locales.messageTitles.Rejected,
        description: locales.messageValues.Rejected,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'ApplyNeedsConfirm':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.QuestionCircle, 'yellow'),
        title: locales.messageTitles.ApplyNeedsConfirm,
        description: locales.messageValues.ApplyNeedsConfirm,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'ApplyConfirmed':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CheckCircle, 'green'),
        title: locales.messageTitles.ApplyConfirmed,
        description: locales.messageValues.ApplyConfirmed,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'ApplyCanceled':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.ExclamationCircle, 'green'),
        title: locales.messageTitles.ApplyCanceled,
        description: locales.messageValues.ApplyCanceled,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'HackExited':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.ExclamationCircle, 'green'),
        title: locales.messageTitles.HackExited,
        description: locales.messageValues.HackExited,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'OtherMessage':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.QuestionCircle, 'blue'),
        title: locales.messageTitles.OtherMessage,
        description: locales.messageValues.OtherMessage,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    default:
      return {};
  }
}
