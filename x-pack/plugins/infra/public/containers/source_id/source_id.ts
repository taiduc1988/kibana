/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import * as runtimeTypes from 'io-ts';

import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { constant, identity } from 'fp-ts/lib/function';
import { useUrlState, replaceStateKeyInQueryString } from '../../utils/use_url_state';

const SOURCE_ID_URL_STATE_KEY = 'sourceId';

export const useSourceId = () => {
  return useUrlState({
    defaultState: 'default',
    decodeUrlState: decodeSourceIdUrlState,
    encodeUrlState: encodeSourceIdUrlState,
    urlStateKey: SOURCE_ID_URL_STATE_KEY,
  });
};

export const replaceSourceIdInQueryString = (sourceId: string) =>
  replaceStateKeyInQueryString(SOURCE_ID_URL_STATE_KEY, sourceId);

const sourceIdRuntimeType = runtimeTypes.union([runtimeTypes.string, runtimeTypes.undefined]);
const encodeSourceIdUrlState = sourceIdRuntimeType.encode;
const decodeSourceIdUrlState = (value: unknown) =>
  pipe(sourceIdRuntimeType.decode(value), fold(constant(undefined), identity));
