import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsNumber()
  public tmdbId: number;

  @IsString()
  public originalTitle: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public mediaType: string;

  @IsBoolean()
  public adult: boolean;

  @IsString()
  public originalLanguage: string;

  @IsString()
  public releaseDate: Date;

  @IsNumber()
  public voteAverage: number;

  @IsNumber()
  public voteCount: number;
}
