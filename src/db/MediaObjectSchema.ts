import mongoose from 'mongoose'

import { MediaObject, EntityTag } from './MediaObjectTypes.js'
import { PointSchema } from './ClimbSchema.js'

const { Schema } = mongoose

const UUID_TYPE = {
  type: 'object', value: { type: 'Buffer' }
}

const EntitySchema = new Schema<EntityTag>({
  targetId: { ...UUID_TYPE, index: true },
  climbName: { type: Schema.Types.String },
  areaName: { type: Schema.Types.String, required: true },
  type: { type: Schema.Types.Number, required: true },
  ancestors: { type: Schema.Types.String, required: true, index: true },
  lnglat: {
    type: PointSchema,
    index: '2dsphere'
  }
}, { _id: true })

const schema = new Schema<MediaObject>({
  userUuid: { ...UUID_TYPE, index: true },
  mediaUrl: { type: Schema.Types.String, unique: true, index: true },
  width: { type: Schema.Types.Number, required: true },
  height: { type: Schema.Types.Number, required: true },
  size: { type: Schema.Types.Number, required: true },
  format: { type: Schema.Types.String, required: true },
  entityTags: [EntitySchema]
}, { _id: true, timestamps: true })

/**
 * Additional indices
 */
schema.index({
  /**
   * For filtering media objects with/without tags
   */
  entityTags: 1,
  /**
   * For sorting media objects by insertion order
   */
  createdAt: -1 // ascending, more recent first
})

/**
 * Get media object model
 * @returns MediaObjectType
 */
export const getMediaObjectModel = (): mongoose.Model<MediaObject> => {
  return mongoose.model('media_objects', schema)
}